import React, { useEffect, useState } from 'react';

const FormComponent = () => {

    const [citas, setTask] = useState([]);
    const [updateView, setUpdateview] = useState(true);
    const [formButtonAction, setFormButtonAction] = useState({
        buttonName: "Agregar",
        action: "add"
    })
    const [formData, setFormData] = useState({
        strIdentification: '',
        strFull_name: '',
        dateBirthday: '',
        strCity: '',
        strNeighborhood: '',
        strTelephone: ''
    });
    const urlBase = "http://localhost/Pablo/api_citas/citas";

    const listTask = async () => {
        const response = await fetch(`${urlBase}/getcitas`);
        const data = await response.json();
        const tasksData = data.tasks.map((item) => {
            return (
                <tr key={item.strIdentification}>
                    <td >{item.strIdentification}</td>
                    <td >{item.strFull_name}</td>
                    <td >{item.dateBirthday}</td>
                    <td >{item.strCity}</td>
                    <td >{item.strNeighborhood}</td>
                    <td >{item.strTelephone}</td>
                    <td >
                        <div className="row">
                            <div className="col-6"><button className="btn btn-primary" 
                                onClick={()=> editTask(item.strIdentification, item.strFull_name, item.dateBirthday, 
                                    item.strCity, item.strNeighborhood, item.strTelephone)}>Editar</button></div>
                        </div>
                        <div className="row">
                            <div className="col-6"><button className="btn btn-danger" onClick={() => deleteTask(item.strIdentification)}>Borrar</button></div>
                        </div>
                    </td>
                </tr>);
        });
        setTask(tasksData);
    }

    const addTask = async () => {
        const response = await fetch(`${urlBase}/postCitas`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        setUpdateview(!updateView);
        setFormData({
            strIdentification: "",
            strFull_name: "",
            dateBirthday: "",
            strCity: "",
            strNeighborhood: "",
            strTelephone: ""
        });
    }

    const createTask = (event) => {
        if(formButtonAction.action == "add"){
            event.preventDefault();
            addTask();
            console.log("Enviando formulario");
        }else{
            event.preventDefault();
            updateTask();
            console.log("update Task");
        }
    }

    const editTask = (Identification, Full_name, Birthday, City, Neighborhood, Telephone) =>{
        setFormData({
            strIdentification: Identification,
            strFull_name: Full_name,
            dateBirthday: Birthday,
            strCity: City,
            strNeighborhood: Neighborhood,
            strTelephone: Telephone
        });

        setFormButtonAction({
            buttonName: "Actualizar",
            action: "update"
        });

    }

    const updateTask = async () => {
        const response = await fetch(`${urlBase}/putCitas`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        setFormData({
            strIdentification: "",
            strFull_name: "",
            dateBirthday: "",
            strCity: "",
            strNeighborhood: "",
            strTelephone: ""
        });

        setFormButtonAction({
            buttonName: "Agregar",
            action: "add"
        });
        
        setUpdateview(!updateView);
    }

    const deleteTask = async (taskId) => {
        const response = await fetch(`${urlBase}/deleteCitas`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: taskId})
        });
        const data = await response.json();
        setUpdateview(!updateView);

    }

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        listTask();
    }, [updateView]);

    return (
        <div>
<div className="container">
            <div>
                <form className="row g-3" onSubmit={createTask}>
                    <div className="col-md-6">
                        <label for="identification" className="form-label">Identificacion</label>
                        <input type="number" className="form-control" itemID="strIdentification" value={formData.strIdentification} name="strIdentification" onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                        <label for="name" className="form-label">Nombre</label>
                        <input type="text" className="form-control" itemID="strFull_name" value={formData.strFull_name} name="strFull_name" onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label for="birthday" className="form-label">Fecha de nacimiento</label>
                        <input type="date" className="form-control" itemID="dateBirthday" value={formData.dateBirthday} name="dateBirthday" onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                        <label for="city" className="form-label">Ciudad</label>
                        <input type="text" className="form-control" itemID="strCity" value={formData.strCity} name="strCity" onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                        <label for="neighborhood" className="form-label">Barrio</label>
                        <input type="text" className="form-control" id="neighborhood" itemID="strNeighborhood" value={formData.strNeighborhood} name="strNeighborhood" onChange={handleInputChange} />
                    </div>
                    <div className="col-md-3">
                        <label for="telephone" className="form-label">Telefono</label>
                        <input type="number" className="form-control" itemID="strTelephone" value={formData.strTelephone} name="strTelephone" onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">{formButtonAction.buttonName}</button>
                </form>
            </div>
        </div>
        <br/><br/><br/>
        <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">identification</th>
                        <th scope="col">nombre</th>
                        <th scope="col">cumpleaños</th>
                        <th scope="col">ciudad</th>
                        <th scope="col">barrio</th>
                        <th scope="col">telefono</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {citas}
                </tbody>
            </table>
        </div>

    );
}

export default FormComponent;