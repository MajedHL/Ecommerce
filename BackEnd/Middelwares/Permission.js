function attributeRules(req,res,next){
    
   const stack= req.route.stack   
   const path=req.originalUrl
   
   const endpoint=stack[stack.length-1].name  
   const route=path.split('/')[1];

   console.log('route:', route)
   console.log('endpoint:', endpoint)




   switch(route){


       case 'products': 
            switch(endpoint){
                case 'getAll':
                case 'getById':
                    req.perm='none';   
                break; 
                default:
                    req.perm='admin';
                break;   
            }
       break;


       case 'carts':
           switch(endpoint){
               case 'modifyCart':
               case 'getCart':
                    req.perm='client';   
                break;
                default :
                req.perm="admin";
                break; 
           }
        break;  


        case'users':
            switch(endpoint){
                case 'getUser':
                    req.perm='client';
                break;
                default:
                    req.perm='admin';
                break;
            }
        break; 
        
        case 'categories':
            switch(endpoint){
                case 'getAll':
                    req.perm='none';
                break;                
                default:
                    req.perm='admin';
                break;
            }
        break;

        // case 'auth':
        //    req.perm='none'; not needed because the midelware is not even applied on this route
        // break;

        default:
            req.perm='admin';
        break;

   }
   
   next()
}


module.exports=attributeRules;