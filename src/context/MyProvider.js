

import MyContext from './MyContext';

class MyProvider extends Component {
    state = {
        uiItems: [],
        user: [],
        organization: []
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    // reducer like methods to change state
                }}
            >
            {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default MyProvider;