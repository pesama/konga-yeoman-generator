{
  type: constants.ACTION_TYPE_MODAL,
  params: {
    template : '/views/add-metadata.html',
    controller: 'SampleModalCtrl',
    parameters: {
      // This params will be accessible within the modal
      param1: 'value1'
    },
    okHandler: function(data) {
      // This is a default ok handler
    },
    koHandler: function(reason) {
      // This is a default ko handler
    }
  }
}