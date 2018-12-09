import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../server/index';
import { users, dropAndRecreateTables } from '../seed/seed';

dotenv.config();
chai.use(chaiHttp);

before(dropAndRecreateTables); // RESET: drop all tables, recreate repopulate with default values 'before' the test begins

describe('POST /auth/signup', () => {
    it('it should respond with a 400 error message for missing fields', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(users.invalidUserNoData)
        .end((err, res) => {
            if (err) done(err);

            res.status.should.eql(400);
            res.body.should.be.an('object').that.has.keys(['status', 'error']);
            res.body.status.should.eql(400);
            res.body.error.should.eql('values are required for the following fields: firstname, lastname, phoneNumber, email, password, confirmPassword');
            done();
        });
    });

    it('it should respond with a 400 error message if firstname is less than 2 characters', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(users.incorrectFirstname)
        .end((err, res) => {
            if (err) done(err);

            res.status.should.eql(400);
            res.body.should.be.an('object').that.has.keys(['status', 'error']);
            res.body.status.should.eql(400);
            res.body.error.should.eql('invalid first name. First name must be a minimum of 2 characters');
            done();
        });
    });

    it('it should respond with a 400 error message if lastname is less than 2 characters', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(users.incorrectLastname)
        .end((err, res) => {
            if (err) done(err);

            res.status.should.eql(400);
            res.body.should.be.an('object').that.has.keys(['status', 'error']);
            res.body.status.should.eql(400);
            res.body.error.should.eql('invalid last name. Last name must be a minimum of 2 characters');
            done();
        });
    });

    it('it should respond with a 400 error message for a wrongly formatted email', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(users.incorrectEmail)
        .end((err, res) => {
            if (err) done(err);

            res.status.should.eql(400);
            res.body.should.be.an('object').that.has.keys(['status', 'error']);
            res.body.status.should.eql(400);
            res.body.error.should.eql('email: leading dash in front of domain is not allowed');
            done();
        });
    });

    it('it should respond with a 400 error message if the two passwords do not match', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signup')
            .send(users.invalidUserMissmatchedPassword)
        .end((err, res) => {
            if (err) done(err);

            res.status.should.eql(400);
            res.body.should.be.an('object').that.has.keys(['status', 'error']);
            res.body.status.should.eql(400);
            res.body.error.should.eql('the two passwords do not match');
            done();
        });
    });

    it('it should respond with a 400 error message if password is less than 6 characters', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signup')
            .send(users.passwordTooShort)
        .end((err, res) => {
            if (err) done(err);

            res.status.should.eql(400);
            res.body.should.be.an('object').that.has.keys(['status', 'error']);
            res.body.status.should.eql(400);
            res.body.error.should.eql('Invalid password. Password should have a minimum of 6 characters');
            done();
        });
    });

    it('it should respond with a 400 error message if phone number is invalid', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signup')
            .send(users.invalidPhoneNumber)
        .end((err, res) => {
            if (err) done(err);

            res.status.should.eql(400);
            res.body.should.be.an('object').that.has.keys(['status', 'error']);
            res.body.status.should.eql(400);
            res.body.error.should.eql('Invalid phone number. Phone number cannot contain characters, and must be less than 16 digits long');
            done();
        });
    });
});