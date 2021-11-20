(function ($) {
  'use strict';


  // Preloader
  $(window).on('load', function () {
    $('#preloader').fadeOut('slow', function () {
      $(this).remove();
    });
  });

  
  // Instagram Feed
  if (($('#instafeed').length) !== 0) {
    var accessToken = $('#instafeed').attr('data-accessToken');
    var userFeed = new Instafeed({
      get: 'user',
      resolution: 'low_resolution',
      accessToken: accessToken,
      template: '<a href="{{link}}"><img src="{{image}}" alt="instagram-image"></a>'
    });
    userFeed.run();
  }

  setTimeout(function () {
    $('.instagram-slider').slick({
      dots: false,
      speed: 300,
      // autoplay: true,
      arrows: false,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });
  }, 1500);


  // e-commerce touchspin
  $('input[name=\'product-quantity\']').TouchSpin();


  // Video Lightbox
  $(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });


  // Count Down JS
  $('#simple-timer').syotimer({
    year: 2022,
    month: 5,
    day: 9,
    hour: 20,
    minute: 30
  });

  //Hero Slider
  $('.hero-slider').slick({
    // autoplay: true,
    infinite: true,
    arrows: true,
    prevArrow: '<button type=\'button\' class=\'heroSliderArrow prevArrow tf-ion-chevron-left\'></button>',
    nextArrow: '<button type=\'button\' class=\'heroSliderArrow nextArrow tf-ion-chevron-right\'></button>',
    dots: true,
    autoplaySpeed: 7000,
    pauseOnFocus: false,
    pauseOnHover: false
  });

  $('.hero-slider').slickAnimation();
	$('#product-modal').on('hidden.bs.modal', function () {
		$("#modal-title").text('');
		$("#modal-price").text('');
		$("#modal-state").text('');
		$("#cardPreviewImage").attr('src','');
		$('#cardPreviewImage').css("display", "none");
		$('#modal-cart').css("display", "none");
		$('#modal-detail').css("display", "none");
	});
	$("#selectSort").on("change",(event)=>{
		let sort = event.target.value.trim();
		$("#sort").val(sort);
		$("#searchForm").submit();
	});
	
	$(".cateAge").on("click",(event)=>{
		let age = event.target.innerText.trim();
		$("#age").val(age);
		$("#searchForm").submit();
	});
	
	$(".catePublisher").on("click",(event)=>{
		let publisher = event.target.innerText.trim();
		$("#publisher").val(publisher);
		$("#searchForm").submit();
	});
	
	$(".cateDepartment").on("click",(event)=>{
		let department = event.target.innerText.trim();
		$("#department").val(department);
		$("#searchForm").submit();
	});
	
	$("#ageBtn").on("click",()=>{
		$("#age").val("");
		$("#searchForm").submit();
	});
	
	$("#publisherBtn").on("click",()=>{
		$("#publisher").val("");
		$("#searchForm").submit();
	});
	
	$("#departmentBtn").on("click",()=>{
		$("#department").val("");
		$("#searchForm").submit();
	});
	
	$("#idCheckBtn").on("click",()=>{
		let memberId = $("#memberId").val().trim();
		if(memberId == '') {
			$("#alertMessage").html('아이디를 입력하세요');
			$("#alert").css("display","block");
			return;
		}
		$.ajax({
			type: "GET",
			url: "/checkId/" + $("#memberId").val(),
			success: function(count) {
				if(count > 0) {
					$("#alertMessage").html('이미 존재하는 아이디입니다. 다른 아이디를 입력해보세요!');
					$("#alertType").html('Warning! ');
					$("#alert").removeClass("alert-success");
					$("#alert").addClass("alert-warning");
					$("#alert").css("display","block");
				} else {
					$("#alert").removeClass("alert-warning");
					$("#alert").addClass("alert-success");
					$("#alertType").html('Success! ');
					$("#alertMessage").html('사용 가능한 아이디입니다');
					$("#alert").css("display","block");
					$("#signinBtn").attr("disabled",false);
				}
			}, 
			error:function(request,status,error) {
				console.dir(request);
				console.dir(status);
				console.error(error);
			}
		});
		//$("#signinForm").submit();
	});
	
	$("#signinBtn").on("click",()=>{
		let memberId = $("#memberId").val();
		let memberPw = $("#memberPw").val();
		let pwCheck = $("#pwCheck").val();
		let memberName = $("#memberName").val();
		let memberContact = $("#memberContact").val();
		
		if(memberId == '') {
			$("#alert").addClass("alert-warning");
			$("#alert").removeClass("alert-success");
			$("#alertType").html('Warning! ');
			$("#alertMessage").html('아이디를 입력하세요');
			$("#alert").css("display","block");
			return;
		} else if(memberPw == '') {
			$("#alert").addClass("alert-warning");
			$("#alert").removeClass("alert-success");
			$("#alertType").html('Warning! ');
			$("#alertMessage").html('비밀번호를 입력하세요');
			$("#alert").css("display","block");
			return;
		} else if(pwCheck == '') {
			$("#alert").addClass("alert-warning");
			$("#alert").removeClass("alert-success");
			$("#alertType").html('Warning! ');
			$("#alertMessage").html('비밀번호 확인란을 입력하세요');
			$("#alert").css("display","block");
			return;
		} else if(memberName == '') {
			$("#alert").addClass("alert-warning");
			$("#alert").removeClass("alert-success");
			$("#alertType").html('Warning! ');
			$("#alertMessage").html('이름을 입력하세요');
			$("#alert").css("display","block");
			return;
		} else if(memberContact == '') {
			$("#alert").addClass("alert-warning");
			$("#alert").removeClass("alert-success");
			$("#alertType").html('Warning! ');
			$("#alertMessage").html('연락처를 입력하세요');
			$("#alert").css("display","block");
			return;
		} else if(memberPw != pwCheck) {
			$("#alert").addClass("alert-warning");
			$("#alert").removeClass("alert-success");
			$("#alertType").html('Warning! ');
			$("#alertMessage").html('비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요');
			$("#alert").css("display","block");
			return;
		} else {
			$("#signinForm").submit();
		}
		
		
	});
	
	$("#memberId").keydown(()=>{
		$("#alert").css("display","none");
		$("#signinBtn").attr("disabled",true);
	});
	
	$("#loginBtn").on("click",()=>{
		if($("#memberId").val()=='' || $("#memberPw").val()=='') {
			alert("아이디와 비밀번호를 입력해주세요");
			return;
		}
		$("#loginForm").submit();
	});
	
	$("#addCartBtn").on("click",()=>{
		let bookId = $("#bookId").val();
		let qty = $("#product-quantity").val();
		if(qty > 0) {
			location.href="/addCart/" + bookId + '/' + qty;
		} else {
			alert("장바구니에 추가하려면 수량이 0보다 커야합니다.");
		}
	});
	
	// /cart 에서 checkbox delete 
	$("#deleteCart").on("click",()=>{
		let checkBoxes = $("input:checkbox[name='cartCheck']"); /*.is(":checked")*/
		let cnt = 0;
		let book_id = '';
		for(let i=0;i<checkBoxes.length;i++) {
			if($(checkBoxes[i]).is(":checked")) {
				book_id += $(checkBoxes[i]).val() + ',';
				cnt ++;
			}
		}
		if(cnt > 0) {
			var newForm = $('<form></form>'); //set attribute (form) 
			newForm.attr("name","deleteCartForm"); 
			newForm.attr("method","post"); 
			newForm.attr("action","/deleteCart");
			// newForm.attr("target","_blank"); 
			// create element & set attribute (input) 
			newForm.append($('<input/>', {type: 'hidden', name: 'book_id', value:book_id })); 
			// append form (to body) 
			newForm.appendTo('body'); 
			// submit form 
			newForm.submit();
		} else {
			alert('선택된 상품이 없습니다.');
		}
	});
	
	$("#checkOutCart").on("click",()=>{
		let checkBoxes = $("input:checkbox[name='cartCheck']"); /*.is(":checked")*/
		let values = '';
		let cnt = 0;
		for(let i=0;i<checkBoxes.length;i++) {
			if($(checkBoxes[i]).is(":checked")) {
				let bid = $(checkBoxes[i]).val();
				values += $("#checkoutValue-" + bid).val() + ',';
				cnt ++;
			}
		}
		if(cnt > 0) {
			var newForm = $('<form></form>');
			newForm.attr("name","deleteCartForm"); 
			newForm.attr("method","post"); 
			newForm.attr("action","/checkout");
			
			// checkoutValues
			newForm.append($('<input/>', {type: 'hidden', name: 'checkoutValues', value:values })); 
			newForm.appendTo('body'); 
			newForm.submit();
		} else {
			alert('선택된 상품이 없습니다.');
		}
	});
	
	$("#card-number").keydown((event)=>{
		if(event.keyCode == '8') {
			if(event.target.value.substr(event.target.value.length - 1, event.target.value.length - 1) == '-') {
				event.target.value = event.target.value.substr(0,event.target.value.length - 1);
			}
		}
	});
	
	$("#card-number").keyup((event)=>{
		/*if(event.keyCode == '8'){
			return;
		} */
		if(event.target.value.length == 19) return;
		if(event.target.value.length % 5 == 4) {
			event.target.value = event.target.value + '-'
		}
	});
	
	$("#card-expiry").keydown((event)=>{
		if(event.keyCode == '8') {
			if(event.target.value.substr(event.target.value.length - 1, event.target.value.length - 1) == '/') {
				event.target.value = event.target.value.substr(0,event.target.value.length - 1);
			}
		}
	});
	
	$("#card-expiry").keyup((event)=>{
		if(event.target.value.length == 5) return;
		if(event.target.value.length == 2) {
			event.target.value = event.target.value + '/';
		}
	});
	
	$(".removeProduct").on("click",(event)=>{
		let bid = event.target.id.replace("remove_","");
		let subtotal = $("#subtotal").html().replace("₩","");
		let shippingFee = $("#shippingFee").html().replace("₩","");
		let total = $("#total").html().replace("₩","");
		
		let newSubtotal = subtotal - ($("#price-"+bid).val() * $("#qty-"+bid).val()  );
		let newShippingFee = shippingFee - $("#shippingFee-"+bid).val();
		let newTotal = newSubtotal + newShippingFee;
		newSubtotal = "₩" + newSubtotal;
		newShippingFee= "₩" +newShippingFee;
		newTotal= "₩" +newTotal;
		
		$("#subtotal").html(newSubtotal);
		$("#shippingFee").html(newShippingFee);
		$("#total").html(newTotal);
		$("#"+bid).remove();
	});
	
	$("#orderProducts").on("click",(event)=>{
		console.log($("#full_name").val());
		console.log($("#postcode").val());
		console.log($("#address").val());
		console.log($("#extraAddress").val());
		console.log($("#detailAddress").val());
		console.log($("#card-number").val());
		console.log($("#card-expiry").val());
		console.log($("#card-cvc").val());
		
		
	});
	
	for(let i=0;i<$(".cateAge").length;i++) {
		if($("#age").val() == $(".cateAge")[i].innerText) {
			$($(".cateAge")[i].children[0]).css("font-weight","bold");
		}
	}
	
	for(let i=0;i<$(".catePublisher").length;i++) {
		if($("#publisher").val() == $(".catePublisher")[i].innerText) {
			$($(".catePublisher")[i].children[0]).css("font-weight","bold");
		}
	}
	
	for(let i=0;i<$(".cateDepartment").length;i++) {
		if($("#department").val() == $(".cateDepartment")[i].innerText) {
			$($(".cateDepartment")[i].children[0]).css("font-weight","bold");
		}
	}
	getCartList(); 
	
	
	
})(jQuery);


function prevAjax(book_id) {
	$.ajax({
		type: "GET",
		url: "/searchOne/" + book_id,
		dataType: 'json',
		// data: {"bookId" : target, "range" : range, "collection" : collection, "datatype": datatype},
		success: function(text) {
			$("#modal-title").text(text.title);
			$("#modal-price").text('₩'+addComma(text.price));
			$("#modal-state").text(text.state);
			let image = text.images.split('|')[0].replaceAll("/dev/workspace/spb/src/main/resources/static", "");
			$("#cardPreviewImage").attr('src',image);
			$('#cardPreviewImage').css("display", "block");   
			$('#modal-cart').css("display", "inline-block");
			$('#modal-cart').attr("href", "/addCart/" + text.book_id + "/1");
			$('#modal-detail').attr('href','/complete-works/' + text.book_id);
			$('#modal-detail').css("display", "inline-block");
			// console.dir(text.title);
		}, 
		error:function(request,status,error) {
			console.dir(request);
			console.dir(status);
			console.error(error);
		}
	});
	
	
}

function addComma(value){
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value; 
}

function getCartList(){
	$.ajax({
			type: "GET",
			url: "/getCartList",
			success: function(data) {
				let str = '';
				let totalPrice = 0;
				for(let i=0;i<data.length;i++) {
					console.dir(data[i].title);
					str += '<div class="media" id="cart_'+data[i].book_id+'">';
					str += '	<a class="pull-left" href="#!">';
					str += '		<img class="media-object" src="'+ data[i].images.split('|')[0] +'" alt="image" />';
					str += '	</a>';
					str += '	<div class="media-body">';
					str += '		<h4 class="media-heading"><a href="#!">'+data[i].title+'</a></h4>';
					str += '		<div class="cart-price">';
					str += '			<span>'+data[i].qty+' x</span>';
					str += '			<span>'+addComma(data[i].price)+'</span>';
					str += '		</div>';
					str += '		<h5><strong id="price_'+data[i].book_id+'">₩'+addComma(data[i].qty*data[i].price)+'</strong></h5>'; totalPrice += (data[i].qty*data[i].price);
					str += '	</div>';
					str += '	<a href="javascript:removeCartOne('+data[i].book_id+')" class="remove"><i class="tf-ion-close"></i></a>';
					str += '</div>';
				}
				str += '<div class="cart-summary">';
				str += '	<span>Total</span>';
				str += '	<span class="total-price" id="cart-total-price">₩'+addComma(totalPrice)+'</span>';
				str += '</div>';
				str += '<ul class="text-center cart-buttons">';
				str += '	<li><a href="/cart" class="btn btn-small">장바구니</a></li>';
				str += '	<li><a href="/checkout" class="btn btn-small btn-solid-border">주문하기</a></li>';
				str += '</ul>';
				
				$("#cartDropdownList").html(str);
			}, 
			error:function(request,status,error) {
				console.dir(request);
				console.dir(status);
				console.error(error);
			}
		});
}
function removeCartOne(book_id){
	let minusPrice = parseInt($("#price_" +book_id).html().replaceAll(',','').replaceAll('₩',''));
	let totalPrice =  parseInt($("#cart-total-price").html().replaceAll(',','').replaceAll('₩',''));
	console.log("minusPrice: " + minusPrice);
	console.log("totalPrice: " + totalPrice);
	totalPrice -= minusPrice;
	$("#cart-total-price").html('₩'+addComma(totalPrice));
	
	$("#cart_" + book_id).remove();
	$.ajax({
			type: "GET",
			url: "/deleteCart",
			data:{"book_id":book_id},
			error:function(request,status,error) {
				console.dir(request);
				console.dir(status);
				console.error(error);
			}
		});
}

function updateProduct(bookId) {
	location.href='/update-usedbook/' + bookId;
}

function deleteProduct(bookId) {
	if (!confirm("상품을 삭제하시겠습니까?")) {
        // 취소(아니오) 버튼 클릭 시 이벤트
    } else {
		let newForm = $('<form></form>'); //set attribute (form) 
		newForm.attr("name","deleteProductForm"); 
		newForm.attr("method","post"); 
		newForm.attr("action","/delete-usedbook/"+bookId);
		// newForm.attr("target","_blank"); 
		// create element & set attribute (input) 
		newForm.append($('<input/>', {type: 'hidden',id:'_method', name: '_method', value:"delete" })); 
		// append form (to body) 
		newForm.appendTo('body'); 
		// submit form 
		newForm.submit();
    }
}

function checkOut() {
	
}

