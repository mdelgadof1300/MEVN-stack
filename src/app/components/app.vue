<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">TO-DO List</a>
            <input type="text" v-model="buscar">
        </nav>

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTask() ">
                                <div class="materia">
                                    <input v-model="task.materia" type="text" name="" id="" placeholder="Escribe la materia">
                                </div>
                                <div class="form-group">
                                    <input v-model="task.title" type="text" placeholder="Escribe la tarea" class="form-control">
                                </div>
                                <div>Seleccione fecha de asignación</div>  
                                <div class="assignment-date">
                                    <input v-model="task.deliveryDate" type="date" name="" id="">
                                </div>
                                 <div>Seleccione fecha de entrega</div>  
                                <div class="delivery-date">
                                    <input v-model="task.assignmentDate" type="date" name="" id="">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="task.description" class="form-control" cols="30" rows="10" placeholder="Escribe la descripción"></textarea>
                                </div>
                                <button v-if="!edit" class="btn btn-primary btn-block">Enviar tarea</button>
                                <button v-else class="btn btn-primary btn-block">Editar tarea</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead class="table header">
                            <tr>
                                <th>Materia</th>
                                <th>Tarea</th>
                                <th>Descripción</th>
                                <th>Fecha asignación</th>
                                <th>Fecha entrega</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task in tasks" :key="task.materia">
                                <td>{{task.materia}}</td>
                                <td>{{task.title}}</td>
                                <td>{{task.description}}</td>
                                <td>{{formato(task.deliveryDate)}}</td>
                                <td>{{formato(task.assignmentDate)}}</td>
                                <td>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger">Eliminar</button>
                                    <button @click="updateTask(task._id)" class="btn btn-secondary">Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    class Task {
        constructor(materia, title, description,deliveryDate,assignmentDate) {
            this.materia = materia;
            this.title = title;
            this.description = description;
            this.deliveryDate = new Date(deliveryDate).getTime();
            this.assignmentDate = new Date(assignmentDate).getTime();
        }
    }
    export default {
        data(){
            return{
                task: new Task(),
                tasks: [],
                edit: false,
                taskToEdit: '',
                buscar: '' //AGREGUÉ ESTO COMO ÚLTIMA MODIFICACIÓN PERO FALTA HACERLO JALAR
            }
        },
        methods:{
            addTask(){
                let self = this;
                console.log(this.task);
                axios.post('/api/tasks', this.task)
                .then(function (response) {
                    console.log(response);
                    self.getTasks();
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.task = new Task();
            },
            getTasks(){
                let self = this;
                axios.get('/api/tasks')
                .then(function (response) {
                    // handle success
                    self.tasks = response.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            },
            deleteTask(id){
               let self = this;
                axios.delete('/api/tasks/'+id)
                .then(function (response) {
                    // handle success
                    self.getTasks();
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                }); 
            },
            updateTask(id){
                let self = this;
                axios.get('/api/tasks/'+id)
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    self.task = new Task(response.data.title, response.data.description);
                    self.taskToEdit = response.data._id;
                    self.edit = true;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            },
            sendTask(){
                let self = this;
                if(!this.edit)
                {
                    this.addTask();
                }
                else
                {
                    axios.put('/api/tasks/'+this.taskToEdit, this.task)
                    .then(function (response) {
                        console.log(response);
                        self.getTasks();
                        self.false = true;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            },
            formato(fecha){
                fecha = new Date(fecha)
                return fecha.toLocaleDateString("es-MX"); 
            }
        },
        created(){
            this.getTasks();
        }
    }
</script>


<style>
</style>