$(document).ready(function() {
  // $('#dataTable').DataTable(
  //   {
  //     "searching": false,
  //     // "ordering": false
  //   }
  // );

  // script  ion range
  $("#range_43").ionRangeSlider({
    type: "single",
    min: 0,
    max: 100,
    from: 50,
    keyboard: true,
    onStart: function (data) {
        console.log("onStart");
    },
    onChange: function (data) {
        console.log("onChange");
    },
    onFinish: function (data) {
        console.log("onFinish");
    },
    onUpdate: function (data) {
        console.log("onUpdate");
    }
  });
} );

