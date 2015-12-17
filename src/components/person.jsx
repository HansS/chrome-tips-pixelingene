var React = require('react');


export default class Person extends React.Component {

    render() {
        return (
            <div className="well">
                <span key="name">{this.props.name}</span>
                <span key="bio">{this.props.bio}</span>
                <span key="location">{this.props.location}</span>
            </div>
        );
    }
}

Person.defaultProps = {
    name: 'No Name',
    contact: {},
    bio: '',
    location: 'No Location',
    skills: {}
};