const ErrorResponse = require('../utils/error_response');
const asyncHandler = require('../middleware/async_middleware');
const uploadFile = require('../middleware/file_upload_middleware');

// @desc      Get all entry
// @route     GET /api/v1/food
// @access    Public
// eslint-disable-next-line no-unused-vars
exports.getFoodList = asyncHandler(async (req, res, next) => {
    console.log('Name:', req.body.name);
    res.status(200).send({
        body: req.body,
    });
});
// @desc      Get all entry
// @route     GET /api/v1/entry
// @access    Public
// eslint-disable-next-line no-unused-vars
exports.addFood = asyncHandler(async (req, res, next) => {
    await uploadFile(req, res);
    // console.log(req.file.filename);
    if (req.file === undefined) {
        next(new ErrorResponse('Please upload a file!', 400));
    }
    res.status(200).send({
        message: `File Upload successfull ${req.file.filename}`,
    });
});
