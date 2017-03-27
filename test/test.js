//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = chai.expect; 

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('/', () => {
    it('Should return a view', (done) => {
        chai.request('http://localhost:3000')
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.file.should.be.a('html');
                done();
            });
    });
});
