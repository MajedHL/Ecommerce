const Authentication=require('../Middelwares/Authentication')
const Authorization=require('../Middelwares/Authorization')
const Permissions=require('../Middelwares/Permission')

const combinedMiddlewares=[Permissions, Authentication, Authorization];

module.exports=combinedMiddlewares;