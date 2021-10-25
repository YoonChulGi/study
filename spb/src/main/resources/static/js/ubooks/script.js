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
			let image = text.images.split('|')[0];
			$("#cardPreviewImage").attr('src',image);
			$('#cardPreviewImage').css("display", "block");   
			$('#modal-cart').css("display", "inline-block");
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

