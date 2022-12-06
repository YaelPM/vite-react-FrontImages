import React from 'react'
import APIInvoker from "../utils/APIInvoker";
import update from "immutability-helper";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            plants: [],
            name: "",
            description: "",
            soil: "",
            climate: "",
            utilities: "",
        }

        this.plants= [];
        // this.name ='',
        // this.description ='',
        // this.soil ='',
        // this.climate ='',
        // this.utilities =''

    }
    componentDidMount() {
        this.getPlants()
    }
    getPlants() {
        APIInvoker.invokeGET('plants/getPlants',
            data => {
                console.log("getPlants: ")
                console.log(data.data)
                this.setState({
                    plants: data.data
                })
            },
            error => {
                console.log("Error")
            })
    }
    add(e){
        //Signup
        let plant = {
            name: this.state.name,
            description: this.state.description,
            soil: this.state.soil,
            climate: this.state.climate,
            utilities: this.state.utilities,
        }
        APIInvoker.invokePOST('plants/postPlant',plant, data => {
            swal({
                title: "Realizado!!",
                text: "CLick en el botón!",
                icon: "success",
                button: "Hecho!",
            });
        }, error => {
            alert(JSON.stringify(error))
        })
        e.preventDefault()
    }
    
    changeField(e) {
        console.log(e.target)
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field] : {$set : value}
        }))
    }
    clear(){
        this.setState(
            {
                nombre:"",
                imagen:""
            }
        )
    }
    render() {
        return(
            <div className={"content"}>
                <div className={"admn"}>
                    {/* <div>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalAdd">Añadir planto</button>
                    </div> */}
                    
                    <div className={"list"}>
                        <div className="container rounded-2 text-center fs-6 bg-white border border-3 border-dark rounded-3">
                                <div className="row border-bottom fs-5 border-1 border-success">
                                    <div className="col border border-dark">
                                        Nombre:
                                    </div>
                                    <div className="col border border-dark">
                                        Descripción:
                                    </div>
                                </div>
                                <If condition={this.state.plants!=null}>
                                    <For each="x" index="idx" of={this.state.plants}>
                                        <div key={idx} className="row border-bottom border-1 border-dark">
                                            <div className="col border border-dark">
                                                {x.name}
                                            </div>
                                            <div className="col border border-dark">
                                                {x.description}
                                            </div>
                                            
                                        </div>
                                        
                                    </For>
                                </If>
                                <If condition={this.state.plants==null}>
                                    No hay datos
                                </If>
                            </div>
                    </div>
                    <div>
                        <center>
                            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalAdd">Añadir planta</button>
                        </center>
                    </div>
                </div>
                <div className="modal" on tabIndex="-1" id={"ModalAdd"}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add plant</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className={"barra"}>
                                            <label htmlFor="name">Nombre</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="name"
                                                   id="name"
                                                   placeholder="Ingrese el nombre"
                                                   aria-describedby="nombreHelp"
                                                   value={this.state.name}
                                                   onChange={this.changeField.bind(this)}/>
                                        </div>
                                        <div className={"barra"}>
                                            <label htmlFor="description">Description</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="description"
                                                   id="description"
                                                   placeholder="Ingrese la descripcion"
                                                   aria-describedby="nombreHelp"
                                                   value={this.state.description}
                                                   onChange={this.changeField.bind(this)}/>
                                        </div>
                                        <div className={"barra"}>
                                            <label htmlFor="soil">Soil</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="soil"
                                                   id="soil"
                                                   placeholder="Ingrese el tipo de suelo"
                                                   aria-describedby="loginHelp"
                                                   value={this.state.soil}
                                                   onChange={this.changeField.bind(this)}/>
                                        </div>
                                        <div className={"barra"}>
                                            <label htmlFor="climate">Climate</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="climate"
                                                   id="climate"
                                                   placeholder="Ingrese el tipo de clima"
                                                   aria-describedby="loginHelp"
                                                   value={this.state.climate}
                                                   onChange={this.changeField.bind(this)}/>
                                        </div>
                                        <div className={"barra"}>
                                            <label htmlFor="utilities">Utilities</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="utilities"
                                                   id="utilities"
                                                   placeholder="Utilidades"
                                                   aria-describedby="loginHelp"
                                                   value={this.state.utilities}
                                                   onChange={this.changeField.bind(this)}/>
                                        </div>
                                        
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal" onClick={this.clear.bind(this)}>Close
                                        </button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.add.bind(this)}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>

        )
        
    }
}
export default Home;