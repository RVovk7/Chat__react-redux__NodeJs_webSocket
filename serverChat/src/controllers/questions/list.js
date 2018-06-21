const list = ({  Question}, {config}) => (req, res, next) => {
console.log('CONTROLLERS=>LIST');
res.status(200).send({message:'Get question'})
}
module.exports = {
    list
};