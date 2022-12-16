module.exports = {
	CHAINFUNDIT_RUNNING: 'CHAINFUNDIT is running on PORT',
	SUCCESS: 'success',

	TRANSACTION_RESPONSE: 'Balance Retrieved',
	TRANSACTION_LIST_RESPONSE: 'Transaction History Retrieved',
	FAIL: 'fail',
	v1: '/api/v1',
	EMAIL_CONFLICT: 'A user with your email already exists',
	THIRD_PARTY_ERROR: 'Error From Third Party Api',
	WELCOME:
		'Welcome to CHAINFUNDIT. The new, fun, and rewarding way to crowdfund!  ',
	INVALID_CREDENTIALS: 'Incorrect login details',
	INVALID_PERMISSION:
		'Permission denied. Invalid credentials provided',
	INVALID_ACCOUNT_NO: 'Invalid account NO',
	NO_BENEFICIARY_FOUND: 'No benefic found please create one',
	INSUFICIENT_FUNDS: "You don't have sufficient funds",
	USER_SIGNUP_SUCCESS: 'Account created successfully',
	MODULE_ERROR_STATUS: 'MODULE_PROCESS_BROKE',
	MODULE_ERROR: 'A module error occurred',
	DB_SUCCESS: 'Database connected',
	DB_ERROR_STATUS: 'DB_PROCESS_FAILED',
	DB_ERROR: 'A database error occurred',
	FORBIDDEN: 'Access forbidden. You do not have the required access.',
	CREATE_USER_ERROR: 'Error creating user',
	CREATE_USER_SUCCESS: 'Created user successfully',
	CREATE_BENEFICIARY_ERROR: 'Error creating beneficiary',
	CREATE_BENEFICIARY_SUCCESS: 'Created beneficiary successfully',
	USER_ALREADY_EXIST: 'USER exists already',
	USERNAME_ALREADY_EXIST: 'USERNAME exists already',
	USER_EXIST_VERIFICATION_FAIL: 'USER_EMAIL_EXIST_VERIFICATION_FAIL',
	USER_EMAIL_EXIST_VERIFICATION_FAIL:
		'USER_EMAIL_EXIST_VERIFICATION_FAIL',
	USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG:
		'Login failed. It is not you, it is us.',
	INTERNAL_SERVER_ERROR: 'Oops, something broke on the server!!!',
	INVALID_EMAIL:
		'This email does not exist, please enter a registered email',
	USER_NOT_FOUND: 'User not found',
	ERROR_FETCHING_USER: 'Error fetching user',
	ERROR_VERIFYING_USER: 'ERROR VERIFYING USER',
	ERROR_VERIFYING_USER_MSG:
		'Error trying to verify user. It is not you, it is us.',
	NOT_FOUND_API: 'Oops, You have reached a dead end',
	ACCESS_REVOKED: 'ACCESS REVOKED',
	AUTH_REQUIRED: 'Access denied,a valid access token is required',
	CHARGE_INITIATION_SUCCESS: 'Charge intitiation successful',
	CHARGE_INITIATION_FAILED: 'Charge intitiation failed',
	CARD_CHARGE_SUCCESS: 'Card transaction was successful',
	CARD_CHARGE_FAILED: 'Charging card failed',
	CARD_TRANSACTION_ERROR: 'Error creating card transaction',
	CARD_TRANSACTION_SUCCESS: 'Card transaction was successful',
	BANK_TRANSACTION_ERROR: 'Error creating bank transaction',
	BANK_TRANSACTION_SUCCESS: 'bank transaction was successful',
	VALIDATE_CARD_CHARGE_FAILED: 'Validation card charge failed',
	VALIDATE_CARD_CHARGE_SUCCESS:
		'Validation card transaction was successful',
	WITHDRAWAL_INITIATED: 'Withdrawal successful',
	WITHDRAWAL_INITIATION_SUCCESS: 'Withdrawal successful',
	WITHDRAWAL_INITIATION_FAILED: 'Withdrawal failed',
	TRANSFER_SUCCESS: (resource) =>
		`Transfer to ${resource} successful`,
	TRANSFER_FAILED: (resource) => `Transfer to ${resource} failed`,
	TRANSFER_ERROR_MESSAGE: 'Error making transfer',
	PARAM_ABSENT: (schema) => `Please provide a valid ${schema}`,
	USER_EXIST_VERIFICATION_FAIL_MSG:
		'Error trying to fetch user. It is not you, it is us.',
	RESOURCE_EXISTS: (resource) => `${resource} exists already.`,
	RESOURCE_NOT_EXISTS: (resource) => `${resource} does not exist`,
	RESOURCE_FETCH_SUCCESS: (resource) =>
		`${resource} fetched successfully`,
	RESOURCE_FETCH_ERROR: (resource) => `could not fetch ${resource}`,
	RESOURCE_EXISTS_VERIFICATION_FAIL: (resource) =>
		`${resource}_EXIST_VERIFICATION_FAIL`,
	RESOURCE_EXISTS_VERIFICATION_FAIL_MSG: (resource) =>
		`${resource} verification failed. It is not you, it is us.`,
	RESOURCE_CREATE_ERROR_STATUS: (resource) =>
		`${resource}_CREATE_ERROR`,
	RESOURCE_CREATE_SUCCESS: (resource) =>
		`${resource} created successfully`,
	RESOURCE_CREATE_ERROR_MSG: (resource) =>
		`Error trying to create ${resource}. It is not you, it is us.`,
	RESOURCE_UPDATE_SUCCESS: (resource) =>
		`${resource} updated successfully`,
	RESOURCE_UPDATE_ERROR_MSG: (resource) =>
		`Error trying to update ${resource}. It is not you, it is us.`,
	RESOURCE_UPDATE_ERROR_STATUS: (resource) =>
		`${resource}_UPDATE_ERROR`,
};