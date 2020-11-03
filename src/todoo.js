class Todoo extends React.Component {
    render() {
        return (
            <div>
                <TodoList/>
            </div>
        );
    }
}

ReactDOM.render(<Todoo />, document.getElementById('todoo'));