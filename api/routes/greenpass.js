const { Certificate, Validator } = require('verificac19-sdk')
const { Router } = require('express')

const router = Router()

// qrdata value for greenpass check
router.post('/greenpass/validate', async (req, res, next) => {
  // eslint-disable-next-line no-console
  // console.log(req.body.qrData)
  if (req.body.qrData != null) {
    const qrData = req.body.qrData
    const myDCCfromRaw = await Certificate.fromRaw(qrData)
    const validationResult = await Validator.validate(myDCCfromRaw)
    res.json(validationResult)
    // eslint-disable-next-line no-console
    // console.log(validationResult)
  }
})

module.exports = router
