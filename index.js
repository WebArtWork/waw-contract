const Contract = require(__dirname + '/schema.js');
module.exports = async function (waw) {
	const router = waw.router('/api/contract');
	router.get('/myContracts', async (req, res) => {
		try {
			const contracts = await Contract.find({
				user_id: req.user._id
			})
			res.json(contracts);
		} catch (err) {
			throw new err
		}
	});
	router.post('/change', async (req, res) => {
		try {
			console.log({
				_id: req.body._id,
				user_id: req.user._id,
			});
			const contract = await Contract.findOne({
				_id: req.body._id,
				user_id: req.user._id,
			})
			if (!contract) return res.json(false);
			contract.status = req.body.status;
			await contract.save();
			res.json(true);
		} catch (err) {
			throw new err
		}
	});
};