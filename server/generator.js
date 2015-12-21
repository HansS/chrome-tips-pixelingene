var faker = require('faker'),
    _ = require('lodash');
faker.locale = 'en_US';

module.exports = {
    person: generatePerson,
    project: generateProject
};

var skills = ['js', 'css', 'design', 'pm', 'ia'],
    levels = ['Junior', 'Senior', 'Manager', 'Director', 'VP'],
    cities = ['Boston', 'New York', 'Atlanta', 'San Francisco', 'Chicago', 'Houston', 'Denver', 'Washington D.C.'];

function generatePerson() {
    return {
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        location: faker.random.arrayElement(cities),
        joinDate: faker.date.past(),
        bio: faker.lorem.sentence(),
        contact: {
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber()
        },
        level: faker.random.arrayElement(levels),
        skills: {
            js: faker.random.number() % 10,
            css: faker.random.number() % 10,
            design: faker.random.number() % 10,
            pm: faker.random.number() % 10,
            ia: faker.random.number() % 10
        }
    };

}

function generateProject() {
    return {
        name: faker.commerce.productName(),
        client: faker.company.companyName(),
        pid: String(faker.random.number() % 100000),
        startDate: faker.date.recent(),
        endDate: faker.date.future(),
        location: faker.random.arrayElement(cities),
        roles: _.times(5, ()=> {
            return {
                level: faker.random.arrayElement(levels),
                skill: faker.random.arrayElement(skills),
                count: faker.random.number() % 3
            }
        })
    };

}