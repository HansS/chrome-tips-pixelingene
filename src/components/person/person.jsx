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
                <div key="email" className="u-text-clip">{this.props.contact.email}</div>

                <div className="container-fluid">
                    {this._renderSkillBars()}
                </div>
            </div>
        );
    }

    _renderSkillBars() {
        return _.map(this.props.skills, (value, skill)=> {
            var percentage = value * 10;

            return (
                <div key={skill} className="row">
                    <div className="col-sm-1">{skill}</div>
                    <div className="col-sm-11">
                        <div className="progress">
                            <div className="progress-bar" style={{width:percentage+'%'}}></div>
                        </div>
                    </div>
                </div>
            );
        });
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