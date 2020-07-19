class Dialog {
	static downloadFile(response) {
		const fileNameRegex = /filename=(.+?);/;
		const contentHeader = response.headers['content-disposition'];
		const fileName = contentHeader.match(fileNameRegex)[1];
		const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = downloadUrl;
		link.setAttribute('download', fileName);
		document.body.appendChild(link);
		link.click();
		link.remove();
	}
}

export default Dialog;