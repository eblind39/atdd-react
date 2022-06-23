const fnFilter = () => {
    const user = {
        name: 'Juntao Qiu',
        address: 'Xian, Shaanxi, China',
        projects: [
            { name: 'ThoughtWorks University' },
            { name: 'ThoughtWorks Core Business Beach' },
        ]
    };
      
    let jp = require('jsonpath');
    const result = jp.query(user, '$.projects');
    return result[0];
}

export default fnFilter;