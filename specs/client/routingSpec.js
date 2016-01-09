'use strict';

describe('Routing', function () {
  var $route;
  beforeEach(module('app'));

  beforeEach(inject(function ($injector) {
    $route = $injector.get('$route');
  }));

  it('Should have / route, template, and controller', function () {
    expect($route.routes['/']).to.be.defined;
    expect($route.routes['/'].controller).to.equal('LandingController');
    expect($route.routes['/'].templateUrl).to.equal('./js/templates/landing.html');
  });

  it('Should have /signup route, template, and controller', function () {
    expect($route.routes['/signup']).to.be.defined;
    expect($route.routes['/signup'].controller).to.equal('AuthController');
    expect($route.routes['/signup'].templateUrl).to.equal('./js/templates/signup.html');
  });

  it('Should have /login route, template, and controller', function () {
    expect($route.routes['/login']).to.be.defined;
    expect($route.routes['/login'].controller).to.equal('AuthController');
    expect($route.routes['/login'].templateUrl).to.equal('./js/templates/login.html');
  });

});
