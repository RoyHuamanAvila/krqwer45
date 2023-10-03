import React, { Component } from "react";

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validación en el input

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false },
      ],
      newTask: "",
    };
  }

  handleChange = (e) => {
    this.setState({ newTask: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newTask.trim() !== "") {
      const updatedTasks = this.state.tasks.concat({
        id: this.state.tasks.length + 1,
        name: this.state.newTask,
        done: false,
      });
      this.setState({ tasks: updatedTasks, newTask: "" });
    }
  };

  handleCrossOut = (id) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });

    this.setState({ ...this.state, tasks: updatedTasks });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => (
              <li
                key={task.id}
                onClick={() => this.handleCrossOut(task.id)}
                className={task.done ? "done" : ""}
              >
                {task.name}
              </li>
            ))}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="new-task"
              placeholder="Ingresa una tarea y oprime Enter"
              onChange={this.handleChange}
              className={this.state.newTask === "" ? "error" : ""}
              value={this.state.newTask}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
