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

        fetch('http://localhost:3000/images/post', {
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
                    <div className="container ">
                        <div className="row">
                            <div className="col-lg-2 ">
                            </div>
                            <div className="col-lg-10 resent-color border-start">
                                <h4 className="h4">Recientes</h4>
                                <div className="image-upload">
                                    <label htmlFor="file-input">
                                        <img src="/src/assets/icons/computacion-en-la-nube.png" width="100" height="100" className="img-cloud"/>
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
                                    <label htmlFor="update">
                                        <img src="/src/assets/icons/refresh%20(1).png" width="100" height="100" className="reload"/>
                                    </label>
                                    <input type="Button" id="update" onClick={this.getImages.bind(this)} defaultValue={"Subir"}  />
                                </div>
                                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <For each="item" index="idx" of={this.state.savedImages}>
                                            {/* <If condition= {idx==0}>
                                            <div class="carousel-item active">
                                                <img src={'http://localhost:3000/' + item} width="100" height="100" className="img-size"></img>
                                            </div>
                                            </If>
                                            <div class="carousel-item active">
                                                <img src={'http://localhost:3000/' + item} width="100" height="100" className="img-size"></img>
                                            </div> */}
                                            <Choose>
                                                <When condition={idx==0}>
                                                    <div className="carousel-item active" key={idx}>
                                                        <img src={'http://localhost:3000/' + item} width="100" height="100" className="img-size"></img>
                                                    </div>
                                                </When>
                                                <When condition={idx>0}>
                                                    <div className="carousel-item" key={idx}>
                                                        <img src={'http://localhost:3000/' + item} width="100" height="100" className="img-size"></img>
                                                    </div>
                                                </When>
                                            </Choose>
                                        </For>
                                        {/* <div class="carousel-item active">
                                        <img src="..." class="d-block w-100" alt="...">
                                        </div>
                                        <div class="carousel-item">
                                        <img src="..." class="d-block w-100" alt="...">
                                        </div>
                                        <div class="carousel-item">
                                        <img src="..." class="d-block w-100" alt="...">
                                        </div> */}
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
                                {/* <div className="overflow-auto" id="over-photos">
                                    <For each="item" index="idx" of={this.state.savedImages}>
                                        <div className='container d-flex justify-content-center' key={idx}>
                                            <img src={'http://localhost:3000/' + item} width="100" height="100" className="img-size"></img>
                                        </div>
                                    </For>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Home;