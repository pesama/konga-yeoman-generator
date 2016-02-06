{
	type: constants.ACTION_TYPE_FUNCTION,
    params: {
      fn : function(params) {

        // You can access current scope
        var scope = params.self;

        // Or inject any dependency you need
        var $window = params.dependencyInjector.get('$window');
        
        $window.open('http://konga.io/academy/reference');
      }
    }
}