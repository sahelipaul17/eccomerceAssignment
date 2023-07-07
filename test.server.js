 // Endpoint testing with mocha and chai and chai-http

    // Import libraries 
    const chai = require('chai');
    const chaiHttp = require('chai-http');

    const should = chai.should();
    var mongoose = require("mongoose");

    // Import server
    var server = require('../index');
     
    server = 'http://localhost:5000'
    // use chaiHttp for making the actual HTTP requests  
    chai.use(chaiHttp);


    describe('user API', function() {
        // beforeEach(function(done) {
        //    
        // });

        // afterEach(function(done) {
        //   
        // });

       //register test cases

        it('should register user on /sign Up POST', function(done) {
            chai.request(server)
                .post('/api/v1/user/register')
                .send({
                    "firstname": "sa",
                    "lastname": "p",
                    "email": "abcd6e@gmail.com",
                    "password": "sahhed@123",
                    "role": "user",
                    "mobile":"8987267893"
                })
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // // res.body.should.be.a('object');
                    // res.body.should.have.property('firstname');
                    // res.body.should.have.property('email');
                    // res.body.should.have.property('mobile');
                    // res.body.isBlocked.should.equal(false);
                    done();
                });
        });

      //login for user and admin test cases

        it('should login on /signin POST', function(done) {
            chai.request(server)
                .post('/api/v1/user/login')
                .send({
                    "email": "abcd5e@gmail.com",
                    "password": "sahhed@123",
                })
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // // res.body.should.be.a('object');
                    // res.body.should.have.property('firstname');
                    // res.body.should.have.property('email');
                    // res.body.should.have.property('mobile');
                    // res.body.should.have.property('token');
                    done();
                });
        });

        var token;
        it('should admin login on /signin admin POST', function(done) {
            chai.request(server)
                .post('/api/v1/user/admin-login')
                .send({
                    "email": "abccd@gmail.com",
                    "password": "sahhed@123"
                })
                .end(function(err, res) {
                    token = res.body.token;
                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // // res.body.should.be.a('object');
                    // res.body.should.have.property('firstname');
                    // res.body.should.have.property('email');
                    // res.body.should.have.property('mobile');
                    // res.body.should.have.property('token');
                    done();
                });
        });


        //post test cases

        it('should add a product on /product POST', function(done) {
            chai.request(server)
                .post('/api/v1/product')
                .send({
                    "name": "product6",
                    "title": "new product 6",
                    "description": "new product type",
                    "price": 203 ,
                    "attributeSet": {
                        "color" : "black",
                        "size"  : "40"
                    },
                    "sku": "3" ,
                    "additionalCost": 1293,
                    "stockCount": 7 ,
                    "category": "cloths",
                    "brand": "vl",
                    "quantity": 1,
                    "sold": 19
                }).set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // // res.body.should.be.a('object');
                    // res.body.should.have.property('title');
                    // res.body.should.have.property('price');
                    // res.body.should.have.property('description');
                    // res.body.should.have.property('sold');
                    // res.body.should.have.property('quantity');
                    // res.body.should.have.property('_id');
                    // res.body.isBlocked.should.equal(false);
                    // res.body.status.should.equal(true);
                    done();
                });
        });
           

        it('should add a product on /cart POST', function(done) {
            chai.request(server)
                .post('/api/v1/user/cart')
                .send({
                    "cart":{
                         "_id": "64a6c413f131ce6dfce44cb2",
                         "count": 4,
                         "color": "white"
                    }
                }).set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.have.property('cart');
                  
                    done();
                });
        });
  
        it('should add a product on /cart/applycoupon POST', function(done) {
            chai.request(server)
                .post('/api/v1/user/cart/applycoupon')
                .send({
                    "coupon":"ER45FFGYYTT"
                }).set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('string');
                    
                    
                    done();
                });
        });
        


        it('should add a cash order on /cart/cash-order POST', function(done) {
            chai.request(server)
                .post('/api/v1/user/cart/cash-order')
                .send({
                    "COD" : "1",
                    "couponApplied" : "1"
                }).set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('message');
                    // res.body.message.should.equal('success');
                    // res.body.status.should.equal(true);
                    done();
                });
        });


        it('should get order on /getorderbyuser/:id POST', function(done) {
            chai.request(server)
                .post('/api/v1/user/getorderbyuser/64a71875a697ca7eb6b872ae')
            .set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('id');
                    //res.body.should.have.property('message');
                    //res.body.message.should.equal('success');
                    // res.body.isBlocked.should.equal(false);
                    // res.body.status.should.equal(true);
                    done();
                });
        });


        it('should add a category on /category POST', function(done) {
            chai.request(server)
                .post('api/v1/category')
                .send({
                    "title" : "Test"
                }).set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('object');
                   // res.body.should.have.property('title');
                    done();
                });
        });


        it('should add a coupon on /addCoupon POST', function(done) {
            chai.request(server)
                .post('api/v1/coupon')
                .send({
                    "name":"ER45FFGYYTT",
                    "expiry": "12/07/2023",
                    "discount": 15
                }).set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                     // res.body.should.be.a('object');
                    //res.body.should.have.property('name');
                    //res.body.should.have.property('expiry');
                    //res.body.should.have.property('discount');
                    done();
                });
        });

        it('should add a enquiry on /addenq POST', function(done) {
            chai.request(server)
                .post('api/v1/enquiry')
                .send({
                    "name":"saheli",
                    "email": "abc@gmail.com",
                    "mobile": 876699354,
                    "comment" : "comment test",
                    "status" : "Submitted"
                })
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('name');
                    // res.body.should.have.property('email');
                    // res.body.should.have.property('mobile');
                    done();
                });
        });


        it('should add a blog on /addblog POST', function(done) {
            chai.request(server)
                .post('api/v1/blog')
                .send({
                    "title" : "blog post 1",
                   "description" : "blog new description",
                   "category"  : "cloths", 
                   "numViews" : 4,
                   "isLiked" : true,
                   "likes" : "64a6bf768af492e1f501cbe4"
                }).set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('title');
                    // res.body.should.have.property('description');
                    // res.body.should.have.property('category');
                    done();
                });
        });


        it('should add a blog  category on /addeblogcategory POST', function(done) {
            chai.request(server)
                .post('api/v1/blogcategory')
                .send({
                    "title" : "beauty"
                }).set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('title');
                    done();
                });
        });

        it('should add a brand on /addebrand POST', function(done) {
            chai.request(server)
                .post('api/v1/brand')
                .send({
                    "title" : "ZARA"
                }).set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {

                    // the res object should have a status of 201
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('title');
                    done();
                });
        });


        //get test cases


        it('should list ALL product on /product GET', function(done) {
            chai.request(server)
                .get('/api/v1/product')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // // res.body.should.be.a('array');
                    // res.body[0].should.have.property('title');
                    // res.body[0].should.have.property('sku');
                    // res.body[0].should.have.property('category');
                    // res.body[0].should.have.property('attributeSet');
                    // res.body[0].should.have.property('_id');
                    done();
                });
        });

        it('should list ALL categories on /category GET', function(done) {
            chai.request(server)
                .get('/api/v1/category')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('title');
                    done();
                });
        });

        it('should list ALL category on /category/:id GET', function(done) {
            chai.request(server)
                .get('/api/v1/category/64a6cc775f310a6328ce12cc')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('title');
                    done();
                });
        });

        it('should list ALL cart on /cart GET', function(done) {
            chai.request(server)
                .get('/api/v1/user/cart')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('products');
                    done();
                });
        });


        it('should list ALL coupon on /coupon GET', function(done) {
            chai.request(server)
                .get('/api/v1/coupon')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('name');
                    done();
                });
        });

        it('should list ALL color on /color GET', function(done) {
            chai.request(server)
                .get('/api/v1/color')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('title');
                    done();
                });
        });



        it('should list ALL order details on /get-orders GET', function(done) {
            chai.request(server)
                .get('/api/v1/user/get-orders')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('products');
                    //res.body[0].should.have.property('paymentIntent');
                    //res.body[0].should.have.property('orderStatus');
                    //res.body[0].should.have.property('orderby');
                    done();
                });
        });


        it('should list ALL wishlist on /user/wishlist GET', function(done) {
            chai.request(server)
                .get('/api/v1/user/wishlist')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('wishlist');
                    //res.body[0].should.have.property('email');
                    //res.body[0].should.have.property('mobile');
                    done();
                });
        });


        it('should list ALL blogcategory on /blogcategory GET', function(done) {
            chai.request(server)
                .get('/api/v1/blogcategory')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('title');
                    done();
                });
        });


        it('should list ALL enquiry on /enquiry GET', function(done) {
            chai.request(server)
                .get('/api/v1/enquiry')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('name');
                    //res.body[0].should.have.property('email');
                    //res.body[0].should.have.property('comment');
                    done();
                });
        });


        it('should list ALL blog on /blog GET', function(done) {
            chai.request(server)
                .get('/api/v1/blog')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('title');
                    //res.body[0].should.have.property('description');
                    //res.body[0].should.have.property('category');
                    done();
                });
        });


        it('should list ALL brand on /brand GET', function(done) {
            chai.request(server)
                .get('/api/v1/brand')
                .end(function(err, res) {
                    // res.should.have.status(200);
                    // res.should.be.json;
                    // res.body.should.be.a('array');
                    //res.body[0].should.have.property('title');
                    done();
                });
        });

        //update test cases

        it('should update products details on /product/64a6c413f131ce6dfce44cb2 PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/product/64a6c413f131ce6dfce44cb2')

                        // this is like sending $http.post or this.http.post in Angular\
                        .send({
                            "name": "product1",
                            "title": "new product 1",
                            "description": "new product type",
                             "price": 203 ,
                             "attributeSet": {
                             "color" : "white",
                             "size"  : "40"
                             },
                            "sku": "7" ,
                            "additionalCost": 293,
                            "stockCount": 3 ,
                            "category": "cloths",
                            "brand": "vl",
                            "quantity": 11,
                            "sold": 1
                        })
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('title');
                            // response.body.should.have.property('description');
                            // response.body.should.have.property('_id');
                            done();
                        });
        });


        it('should update category details on /category/64a6cc775f310a6328ce12cc PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/category/64a6cc775f310a6328ce12cc')

                        // this is like sending $http.post or this.http.post in Angular\
                        .send({
                            "title": "Cloths-western",
                        })
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('title');
                            // response.body.should.have.property('_id');
                            done();
                        });
        });


        it('should update wishlist details on /product/wishlist PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/product/wishlist')

                        // this is like sending $http.post or this.http.post in Angular\
                        .send({
                            "prodId" : "64a6c447f131ce6dfce44cbc"
                        })
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('title');
                            // response.body.should.have.property('_id');
                            done();
                        });
        });

        it('should update wishlist details on /product/rating PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/product/rating')

                        // this is like sending $http.post or this.http.post in Angular\
                        .send({
                            "star" : "3",
                            "prodId" : "64a6c413f131ce6dfce44cb2",
                            "comment" : "nice"
                        })
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('prodId');
                            // response.body.should.have.property('comment');
                            done();
                        });
        });



        it('should update coupon on /coupon/64a6dcf1ab7224ad3af72a7b PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/coupon/64a6dcf1ab7224ad3af72a7b')

                        // this is like sending $http.post or this.http.post in Angular\
                        .send({
                            "name" : "WESGH56FGR"
                        })
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('name');
                            done();
                        });
        });


        it('should update coupon on user/block-user/64a71875a697ca7eb6b872ae PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/user/block-user/64a71875a697ca7eb6b872ae')

                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            done();
                        });
        });


        it('should update coupon on user/unblock-user/64a71875a697ca7eb6b872ae PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/user/block-user/64a71875a697ca7eb6b872ae')

                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            done();
                        });
        });


        it('should edit user on user/edit-user PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/user/block-user/64a71875a697ca7eb6b872ae')
                        .send({
                            "firstname": "saheli",
                            "lastname": "paul",
                            "email": "abcd@gmail.com",
                            "mobile": "675548977"
                        })
                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            done();
                        });
        });


        it('should edit user address on user/save-address PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/user/save-address')
                        .send({
                            "address": "kormangala road"
                        })
                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('address');
                            done();
                        });
        });



        it('should edit blog on blog/64a7b2703f332113da95a4be PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/blog/64a7b2703f332113da95a4be')
                        .send({
                            "description" : "new products for western dress added"
                        })
                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('description');
                            done();
                        });
        });


        it('should edit blog on blog/dislikes PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/blog/dislikes')
                        .send({
                            "blogId" : "64a7b2703f332113da95a4be"
                        })
                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('dislikes');
                             // response.body.should.have.property('_id');
                            done();
                        });
        });

    
        it('should edit blog on /blog/likes PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/blog/likes')
                        .send({
                            "blogId" : "64a7b2703f332113da95a4be"
                        })
                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('dislikes');
                             // response.body.should.have.property('_id');
                            done();
                        });
        });


      
        it('should edit blogcategory on /blogcategory/64a785a74dccbceed6348432 PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/blogcategory/64a785a74dccbceed6348432')
                        .send({
                            "title" : "western cloths"
                        })
                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('title');
                             // response.body.should.have.property('_id');
                            done();
                        });
        });



        it('should edit brand on /brand/64a786c59a3b365308b00f9d PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/brand/64a786c59a3b365308b00f9d')
                        .send({
                            "title" : "zara - pride"
                        })
                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('title');
                             // response.body.should.have.property('_id');
                            done();
                        });
        });

        it('should edit enquiry on /enquiry/64a786669a3b365308b00f99 PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/enquiry/64a786669a3b365308b00f99')
                        .send({
                            "name": "saheli",
                             "email": "abc@gmail.com",
                              "mobile": 876699354,
                              "comment": "comment test",
                               "status": "Submitted"
                        })
                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('title');
                             // response.body.should.have.property('_id');
                            done();
                        });
        });


        it('should edit order status  on user/order/update-order/64a72008a67a74994b080e55 PUT', function(done) {
            chai.request(server)
                    chai.request(server)
                        .put('/api/v1/user/order/update-order/64a72008a67a74994b080e55')
                        .send({
                               "status": "Processing"
                        })
                        // this is like sending $http.post or this.http.post in Angular\
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            // response.should.have.status(200);
                            // response.should.be.json;
                            // response.body.should.be.a('object');
                            // response.body.should.have.property('title');
                             // response.body.should.have.property('_id');
                            done();
                        });
        });






        //delete test cases


           it('should delete products details on /product/64a6c413f131ce6dfce44cb2 DELETE', function(done) {
                    chai.request(server)
                        .delete('/api/v1/product/64a6c413f131ce6dfce44cb2')
                        .end(function(error, response) {
                            // response.should.have.status(200);
                            // response.body.should.have.property('message');
                            done();
                        });
            });

            it('should delete category details on /category/64a6c413f131ce6dfce44cb2 DELETE', function(done) {
                chai.request(server)
                    .delete('/api/v1/category/64a6c413f131ce6dfce44cb2')
                    .end(function(error, response) {
                        // response.should.have.status(200);
                        // response.body.should.have.property('message');
                        done();
                    });
            });


            it('should delete cart details on user/empty-cart DELETE', function(done) {
                chai.request(server)
                    .delete('/api/v1/user/empty-cart')
                    .end(function(error, response) {
                        // response.should.have.status(200);
                        // response.body.should.have.property('message');
                        done();
                    });
            });



            it('should delete user details on user/64a6c413f131ce6dfce44cb2 DELETE', function(done) {
                chai.request(server)
                    .delete('/api/v1/user/64a6c413f131ce6dfce44cb2')
                    .end(function(error, response) {
                        // response.should.have.status(200);
                        // response.body.should.have.property('message');
                        done();
                    });
            });



            it('should delete brand on brand/64a786c59a3b365308b00f9d DELETE', function(done) {
                chai.request(server)
                    .delete('/api/v1/brand/64a786c59a3b365308b00f9d')
                    .end(function(error, response) {
                        // response.should.have.status(200);
                        // response.body.should.have.property('message');
                        done();
                    });
            });



            it('should delete blog on blog/64a6ecd789c20a7c56ede572 DELETE', function(done) {
                chai.request(server)
                    .delete('/api/v1/blog/64a6ecd789c20a7c56ede572')
                    .end(function(error, response) {
                        // response.should.have.status(200);
                        // response.body.should.have.property('message');
                        done();
                    });
            });



            it('should delete blog on blogcategory/64a785a74dccbceed6348432 DELETE', function(done) {
                chai.request(server)
                    .delete('/api/v1/blogcategory/64a785a74dccbceed6348432')
                    .end(function(error, response) {
                        // response.should.have.status(200);
                        // response.body.should.have.property('message');
                        done();
                    });
            });



    });
