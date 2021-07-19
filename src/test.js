app.intent('questions', (conv,params) => {
       console.log("------------5555555555555-43",params.externalcolumns,params.stakeholdernam);
       return databaseconnection().then(con => {
      const projectname = params.Project;
      const BusinessCategory = params.BusinessCategory;
      const type = params.stakeholdername;
      console.log("-----------32",type);
      if(type == 'Internal Stakeholders'){
      return queryinternal(con, projectname,BusinessCategory)
          .then(result => {
              console.log(result,result.recordset.length);
               if (result.recordset.length > 0) {
                   var q = [];
                   if(result.recordset.length > 0){
                   (result.recordset).forEach(element => {
                   console.log("---------2345",element['Name of Stakeholders']);
                   q.push(
                        new BrowseCarouselItem({
                          title: `Project name : ${element['Project Names']}`,
                          url: 'https://example.com',
                          description :`Team Leader Category : ${element['Team Leader Category']}, Name of Stakeholders: ${element['Name of  Stakeholders']}`,
                          image: new Image({
                            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1vbeUmrSe3_j4KeDcOB-WTqZJ4aTySOWWUw&usqp=CAU',
                            ratios:' portrait',
                            alt: 'Image alternate text',
                          }),
                          footer: 'data for internal stakeholders',
                        }));
                    });
                console.log("=========12",q);
                conv.add(`Please see details below`);
                conv.ask(new BrowseCarousel({
                    items: q
                  }));
                }
                else{
                    conv.add(`${msg} is expert for ${BusinessCategory} `);
                }    
               }
               else {
                  conv.add(`Sorry but I could not found any relevant data for this info. Please try with different data inputs`);
               }
          });
      }
      //else{
       //       conv.add(`We are querying from external stakeholder`);
      //}
       else{
        return queryexternal(con, projectname,BusinessCategory)
        .then(result => {
            console.log(result,result.recordset.length);
             if (result.recordset.length > 0) {
                 var p = [];
                 if(result.recordset.length > 0){
                 (result.recordset).forEach(element => {
                // console.log("---------2345",element['Name of Stakeholders']);
                 p.push(
                      new BrowseCarouselItem({
                        title: `Project name : ${element.Project_Names}`,
                        url: 'https://example.com',
                        description :`Stakeholder's Post/Designation: ${element.Stakeholder_s_Post_Designation}, Name of Stakeholders: ${element.Name_of_External_Stake_holder_s}`,
                        image: new Image({
                          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1vbeUmrSe3_j4KeDcOB-WTqZJ4aTySOWWUw&usqp=CAU',
                          ratios:' portrait',
                          alt: 'Image alternate text',
                        }),
                        footer: 'data for external stakeholders',
                      }));
                  });
              //console.log("=========12",q);
              conv.add(`Please see details below`);
              conv.ask(new BrowseCarousel({
                  items: p
                }));
              }
              else{
                  conv.add(`${msg} is expert for ${BusinessCategory} `);
              }    
             }
             else {
                conv.add(`Sorry but I could not found any relevant data for this info. Please try with different data inputs`);
             }
        });
       }
    });
});
