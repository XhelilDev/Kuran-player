let audio = document.querySelector('.quranPlayer'),
    surahsContainer = document.querySelector('.surahs'),
    //ajContainer=document.querySelector('.aj'),
    ayah = document.querySelector('.ayah'),
    next = document.querySelector('.next'),
    prev = document.querySelector('.prev'),
    play = document.querySelector('.play');
    getSurahs();
     
 function getSurahs()
{
    //Fetch To Get Surahs data
    fetch('https://quranapi.idn.sch.id/surah')
    .then(response => response.json())
    .then(data=>{
        
        //const ajet=data.data[0].name
        console.log(data)
        for (let surah in data.data) 

    
       
        {
            surahsContainer.innerHTML+= 
            `
                <div>
                    <p>${data.data[surah].name}</p>
                    <p>${data.data[surah].translationEn}</p>
                    
                    
                </div>
            ` 
            
        }
        //selct all surahs
        let allSurahs = document.querySelectorAll('.surahs div'),
        AyahsAudios ,
        AyahsText;
        //let surah =  data.ayahs
      
        allSurahs.forEach((surah,index)=>{
           surah.addEventListener('click',()=>{
               fetch(`https://quranapi.idn.sch.id/surah/${index+1}`)
               .then(response => response.json())
               .then(data=> {
                        //console.log(data);



                        let verses=data.ayahs
                        //console.log(verses)
                           AyahsAudios = [];
                            AyahsText = [];
                        
                        verses.forEach(verse=>{
                            console.log(verse.audio)

                                 AyahsAudios.push(verse.audio)
                                 AyahsText.push(verse.ayahText)
                        })

                        console.log(AyahsAudios)
                        console.log(AyahsText)
                     
                        
                
                //    //console.log(verses)

                //    //let surah =  data.ayahs;
                //    //surah.forEach(surah=>{
                //         AyahsText.push(surah.ayahText)
                        
                
                  
                        
    //    console.log(AyahsAudios)
    //    console.log(surah.audio)
        
            // surahsContainer.innerHTML+= 
            // `
            //     <div>
            //         <p>${surah.name}</p>
            //         <p>${surah.translationEn}</p>
            //         <p>${surah.number}<p>
                    
                    
            //     </div>
            // ` 
            //<p><a href='viewajete.html?number=${surah.number}'>View</a><p></p>
            
        
           

//                        console.log(AyahsText)
//                        console.log(AyahsAudios)

//                     //    console.log(ayahs.ayahText)
//                     //    console.log(AyahsAudios)
                       
                       
//                    })
                   let AyahIndex = 0;
                   changeAyah(AyahIndex)
                   audio.addEventListener('ended',()=>{
                       AyahIndex++;
                       if(AyahIndex < AyahsAudios.length)
                       {
                           changeAyah(AyahIndex)
                       }
                       else
                       {
                           AyahIndex = 0;
                           changeAyah(AyahIndex);
                           audio.pause()
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'surah has been ended',
                                showConfirmButton: false,
                                timer: 1500
                            }) 
                            isPlaying = true;
                            togglePlay()
                       }
                   })
                   //Handle Next And Prev
                    next.addEventListener('click',()=>{
                        AyahIndex < AyahsAudios.length - 1 ? AyahIndex++ : AyahIndex = 0;
                        changeAyah(AyahIndex)
                    })
                    prev.addEventListener('click',()=>{
                        AyahIndex == 0 ? AyahIndex = AyahsAudios.length - 1 : AyahIndex--;
                        changeAyah(AyahIndex)
                    })
                    //handle Play And Pause Audio
                    let isPlaying = false ;
                    togglePlay()
                    function togglePlay()
                    {
                        if(isPlaying)
                        {   
                           audio.pause();
                           play.innerHTML = `<i class="fas fa-play"></i>`;
                           isPlaying =false;
                        }
                        else
                        {
                            audio.play();
                            play.innerHTML = `<i class="fas fa-pause"></i>`;
                            isPlaying = true;
                        }
                        
                    }
                    play.addEventListener('click',togglePlay)
                   function changeAyah(index)
                   {
                        audio.src = AyahsAudios[index];
                        ayah.innerHTML = AyahsText[index]
                    }
                   
               })
            })
        })
   })
 }