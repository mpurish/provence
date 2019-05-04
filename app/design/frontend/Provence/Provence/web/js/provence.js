require(['jquery'], function($){
    $(document).ready(function(){
        $('#product_addtocart_form').find('.qty').on('blur', function () {
            var $this = $(this);
            if(isNaN($this.val())) {
                $this.val(1);
            }
            else if($this.hasClass('qty--integer')) {
                $this.val((1 * $this.val()).toFixed(0));
            }
            else {
                var thisVal = (1 * $this.val()).toFixed(1);
                if(thisVal % 1 === 0) {
                    thisVal = (1 * thisVal).toFixed(0);
                }
                else {
                    thisVal = thisVal + '0';
                }
                $this.val(thisVal);
            }
        });
    })
});