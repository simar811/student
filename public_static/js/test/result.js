$(()=>{
   $('#submitBtn').click(e=>{
       e.preventDefault();
       const total = Number($('#totalQues').text());
       console.log(total);

       let correct = 0;

       for(let i=0 ; i<total ; i++){
           console.log($('input[name="exampleRadios'+i+'"]:checked').val());
           if(Number($('input[name="exampleRadios'+i+'"]:checked').val()) === Number($('#ans'+i).text())){
               correct++;
               $('#questionNo'+i).addClass('correct');
           }
           else{
               $('#questionNo'+i).addClass('wrong');
           }
       }


       $('#result').html('<h1> Result </h1>' +
           '<h2>' + correct +' correct out of ' + total + ' Questions!</h2>');
   });
});