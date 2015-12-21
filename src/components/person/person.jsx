var React = require('react');


export default class Person extends React.Component {

    render() {
        var name = [this.props.firstName, this.props.lastName].join(', ');

        return (
            <div className="thumbnail person">
                <h3 key="name">{name}</h3>
                <div key="bio">
                    <i>{this.props.bio}</i>
                </div>
                <div key="location">{this.props.location}</div>
                <div key="email">{this.props.contact.email}</div>
            </div>
        );
    }
}

Person.defaultProps = {
    firstName: 'First',
    lastName: 'Last',
    contact: {},
    bio: '',
    location: 'No Location',
    skills: {}
};