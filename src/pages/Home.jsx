import React from 'react'
import APIInvoker from "../utils/APIInvoker";
import Header from './Header';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            token: false,
            images: [],
            savedImages: [],
            userid: 1
        }

        this.token = false,
        this.getImages()

    }
    // componentDidMount() {
        
    // }
    selectedImages(e) {
        this.setState({
            images: e.target.files
        })
    }
    viewImages() {
        console.log(this.state.images)
    }
    getImages() {
        
        APIInvoker.invokeGET(`/images/getimages/1`,
            data => {
                console.log("getimages: ")
                console.log(data.data)
                this.setState({
                    savedImages: data.data
                })
            },
            error => {
                console.log("Error")
            })
    }

    sendImages() {
        if (!this.state.images) {
            alert("You must charge a image")
            return
        }

        const formdata = new FormData()

        for (let index = 0; index < this.state.images.length; index++) {
            formdata.append("images", this.state.images[index])
        }
        formdata.append("userid", this.state.userid)

        console.log(this.state.images)

        fetch('http://54.86.175.108/images/post', {
            method: 'POST',
            body: formdata
        })
            .then(res => res.text())
            .then(
                res => console.log(res),
                this.getImages()
            )
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>
                <Header></Header>
                <div className="home vh-color">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 ">
                            </div>
                            <div className="col-lg-10 resent-color border-start">
                                <h4 className="h4" color='white'>Recientes</h4>
                                <div className="image-upload">
                                    <label htmlFor="file-input">
                                        <img src="https://th.bing.com/th/id/OIP.cSA3urhjSmO5TEzR0i3BQQHaHZ?pid=ImgDet&rs=1" width="100" height="100" className="img-cloud"/>
                                    </label>
                                    <input id="file-input" type={"file"} multiple className='form-control ' onChange={this.selectedImages.bind(this)}></input>
                                </div>
                                <input type="Button" id="reload" onClick={this.sendImages.bind(this)} defaultValue={"Subir"} className="btn update"/>

                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1">

                            </div>
                            <div className="col-lg-1">

                            </div>
                            <div className="col-lg-10 resent-color border-start" >
                                <div className="image-upload">
                                    <img src="https://th.bing.com/th/id/OIP.ZKo9bhGA9Ee5NM_Si47T3wHaHW?pid=ImgDet&rs=1" width="100" height="100" className="reload"/>
                                    <input type="Button" id="update" onClick={this.getImages.bind(this)} defaultValue={"Update Images"}  />
                                </div>
                                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <For each="item" index="idx" of={this.state.savedImages}>
                                            <Choose>
                                                <When condition={idx==0}>
                                                    <div className="carousel-item active" key={idx}>
                                                        <img src={'http://54.86.175.108/' + item} width="100" height="100" className="img-size"></img>
                                                    </div>
                                                </When>
                                                <When condition={idx>0}>
                                                    <div className="carousel-item" key={idx}>
                                                        <img src={'http://54.86.175.108/' + item} width="100" height="100" className="img-size"></img>
                                                    </div>
                                                </When>
                                            </Choose>
                                        </For>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Home;