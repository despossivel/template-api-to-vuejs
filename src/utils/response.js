
const response = (res, data, payloadError) => {
	if(!Boolean(data?.length)) return res.status(404).send(payloadError)
	return res.status(200).send(data);
}

export {
	response
}

export default response
