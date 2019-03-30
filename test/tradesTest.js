const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const server = require('../src/app');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

it('Welcome content', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            let body = JSON.parse(res.text);
            body.should.be.a('object');
            // body.code.should.be.eq(200);
            body.status.should.be.eq('Success');
            body.message.should.be.eq('Hello world!');
            done();
        });

});

describe('Intellect APIs', () => {

    it('it should DELETE all the trades', (done) => {
        chai.request(server)
            .delete('/trades/erase')
            .end((err, res) => {
                res.should.have.status(200);
                let body = JSON.parse(res.text);
                body.should.be.a('object');
                body.code.should.be.eq(200);
                body.status.should.be.eq('Success');
                body.message.should.be.eq('Trades deleted successfully.');
                // body.message.should.be.a('array');
                done();
            });
    });

    it('it should SAVE the trades', (done) => {
        let trades = {
            "type": "buy",
            "user": {"id": "1", "name": "sundar"},
            "symbol": "@",
            "shares": "10",
            "price": "130.42"
        };

        chai.request(server)
            .post('/trades')
            .send(trades)
            .end((err, res) => {
                res.should.have.status(200);
                let body = JSON.parse(res.text);
                body.should.be.a('object');
                body.code.should.be.eq(201);
                body.status.should.be.eq('Success');
                body.message.should.be.eq('Trade inserted successfully.');
                // body.message.should.be.a('array');
                done();
            });
    });

    it('it should GET all the trades', (done) => {

        chai.request(server)
            .get('/trades')
            .end((err, res) => {
                res.should.have.status(200);
                let body = JSON.parse(res.text);
                body.should.be.a('object');
                body.code.should.be.eq(200);
                body.status.should.be.eq('Success');
                body.message.should.be.a('array');
                done();
            });
    });

    it('it should GET trades By userId', (done) => {

        chai.request(server)
            .get('/trades/users/1')
            .end((err, res) => {
                res.should.have.status(200);
                let body = JSON.parse(res.text);
                body.should.be.a('object');
                body.code.should.be.eq(200);
                body.status.should.be.eq('Success');
                body.message.should.be.a('object');
                done();
            });
    });

});