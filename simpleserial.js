let serial;
let writer;
let reader;
var done;
var output;

decoder = new TextDecoder();
encoder = new TextEncoder();

async function serialConnect(baud) {
    serial = await navigator.serial.requestPort();
    console.log("connecting...");
    try {
        await serial.open({
            baudRate: baud
        });
        console.log("Connected!");
    } catch (err) {
        console.error("Failed to Connect: Maybe the port is already opened in another tab or program? " + err);
    }
}

async function serialDisconnect() {
    console.log(output);
    console.log("Disconnecting...");
    try {
        await serial.close();
        console.log("Disconnected!");
    } catch (err) {
        console.error("Failed to Disconnect, are the receive and send streams still locked? " + err);
    }
}

async function serialReceiveUntil(outputElementID, transmissionEnd) {
    console.log("Started Receiving untill " + TransmissionEnd + "is found in the received data.");
	var parse = 0;
    var alldata = "";
    const reader = serial.readable.getReader();
    while (true) {
        let {value, done} = await reader.read();
        
        console.log("Received via serial: " + decoder.decode(value));
        alldata = alldata + decoder.decode(value);
        if (alldata.includes(transmissionEnd)) {
            output = alldata;
			document.getElementById(outputElementID).value = output;
            //reader.releaseLock();
			console.log(output);
			reader.releaseLock();
			console.log("Stopped Receiving.");
            break;
        }
    }
}

async function serialReceive(outputElementID) {
	console.log("Started Receiving.");
    var alldata = "";
    const reader = serial.readable.getReader();
    let {value, done} = await reader.read();  
	console.log("Received via serial: " + decoder.decode(value));
	alldata = alldata + decoder.decode(value);
	document.getElementById(outputElementID).value = alldata;
	output = alldata;
	//reader.releaseLock();
	console.log(output);
	reader.releaseLock();
	console.log("Stopped Receiving.");
}

async function serialSend(inputMethod, inputData) {
	if (inputMethod == 1) {	
		value = inputdata;
	} 
	else if (inputMethod == 2) {	
		var id = document.getElementById(inputData);
		var value = id.value;
	}
    const writer = serial.writable.getWriter();
    console.log("Send via serial: " + value);
    await writer.write(encoder.encode(value));

    // Allow the serial port to be closed later.
    writer.releaseLock();
}
