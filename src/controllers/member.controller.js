const Member = require('../models/members.model')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/**
 * @author Joel Odufu <joel.odufu@gmail.com>
 * @description Ping the Route `test`
 * @route `@any`
 * @access Public
 * @type POST
 */
exports.ping = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    status: 'success',
    message: 'Hello from Member',
    data: req.body || {}
  });
});

/**
 * @author Joel Odufu EKowoicho <joel.odufu@gmail.com>
 * @description Get all members Controller
 * @route `/api/member/getmembers`
 * @access Private
 * @type GET
 */
exports.getAll = catchAsync(async (req, res, next) => {
  try {
    const data = await Member.find()

    // Check if the member exists
    if (!data) {
      return next(new AppError("Member not found", 404));
    }

    // Return data of list of all members
    res.status(200).json({
      success: true,
      len: data.length,
      data
    })
  } catch (error) {
    return next(new AppError("An error occured, please try again", 500));
  }
})

/**
 * @author Joel Odufu EKowoicho <joel.odufu@gmail.com>
 * @description Get a member Controller
 * @route `/api/member/getmember/:id`
 * @access Private
 * @type GET
 */
exports.getMember = catchAsync(async (req, res, next) => {
  try {
    // Get the member by id
    const data = await Member.findById(req.params.id).populate("_user")

    // Check if the member exists
    if (!data) {
      return next(new AppError('Member not found', 404));
    }

    // Return data after the member
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(new AppError("An error occured, please try again", 500));
  }
});


/**
 * @author Joel Odufu EKowoicho <joel.odufu@gmail.com>
 * @description Post a member Controller
 * @route `/api/member/postmember`
 * @access Private
 * @type POST
 */
exports.postMember = catchAsync(async (req, res, next) => {
  try {
    const { fullName,image, email, role, gender, phone } = req.body;

    // Create a new member Object
    const member = new Member({
      fullName,
      image,
      email,
      role,
      gender,
      phone,
    })

    if (!member) {
      return next(new AppError('Please provide the required fields', 401));
    }

    // Save the member object to the database
    await member.save()

    // const causeLink = `http://localhost:30000/cause/${cause._id}`;

    res.status(200).json({
      success: true,
      message: 'Member created successfully',
      data: member
    });
  } catch (error) {
    return next(new AppError("An error occured, please try again", 500));
  }
})

/**
 * @author Joel Odufu EKowoicho <joel.odufu@gmail.com>
 * @description Edit member Controller
 * @route `/api/member/editmember/:id`
 * @access Private
 * @type PUT
 */
exports.editMember = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find the user by ID
    const member = await Member.findByIdAndUpdate(id, updates, { new: true });

    // Check if the cause exists
    if (!member) {
      return next(new AppError('Member not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Member updated successfully',
      data: member,
    });
  } catch (error) {
    return next(new AppError("An error occured, please try again", 500));
  }
});

/**
 * @author Joel Odufu EKowoicho <joel.odufu@gmail.com>
 * @description Delete a member Controller
 * @route `/api/member/deletemember/:id`
 * @access Private
 * @type DELETE
 */
exports.deleteMember = catchAsync(async (req, res, next) => {
  try {
    //Get the member id
    const member = await Member.findByIdAndDelete(req.params.id)

    // Check if the member exists
    if (!member) {
      return next(new AppError('No member found with that Id', 404));
    }

    // Return data after the member has been deleted
    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
      data: {
        cause: null
      }
    })
  } catch (error) {
    return next(new AppError("An error occured, please try again", 500));
  }
})
