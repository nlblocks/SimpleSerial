# SimpleSerial

#### SimpleSerial uses the Web Serial API (https://wicg.github.io/serial/)

To use SimpleSerial, a secure connection is needed! (localhost, https or use Chrome flag: chrome://flags/#unsafely-treat-insecure-origin-as-secure)


## How to install:

Download simpleserial.js and add it to your <head>:

    <script src="js/simpleserial.js"></script>

Or, alternatively, get it online: 

      <script src="https://raw.githubusercontent.com/nlblocks/SimpleSerial/main/simpleserial.js"></script>

## How to use/available functions:

You can use html buttons with the onclick event to trigger the functions:

Example:

    <button onclick="serialConnect(115200);">Connect Serialport</button>
    <button onclick="serialDisconnect()">disconnect Serialport</button>

### serialConnect(baud);
To connect to a serial port, call serialConnect(baud) and choose the port from the pop-up. 
- Replace baud for the baudrate you want to use.

Example:

    serialConnect(115200);

### serialDisconnect();
 
To disconnect from a Serial Port, simply call serialDisconnect() after you are done receiving data.
	
Example:

	serialDisconnect();

### serialReceiveUntil(outputElementID, transmissionEnd);
To receive a continous stream of data untill a certain ending, call serialReceiveUntil(outputElementID, transmissionEnd).
- Replace outputElementID with the element id you want the data to appear in, like a textarea or input field.
- Replace transmissionEnd with a end string 
	
Example:

	serialReceiveUntil('outputfield', 'End of Data');
	
### serialReceive(outputElementID);
To receive data once, call serialreceive(outputElementID).
- Replace outputElementID with the element id you want the data to appear in, like a textarea or input field.
	
Example:

	serialReceive('outputfield');

### serialSend(inputMethod, inputData);
To send data, call serialSend(inputMethod, inputData).

- Replace inputMethod with the way you want to get the data:
    - 1 = Replace inputData with the string you want to send to the connected serial port.
    - 2 = Replace inputData with a string containing the id for the textarea or input field from which you want to get the string to send to the connected serial port.

Example:

    Example 1: Direct string: serialSend(1, 'Data i want to send.') sends: "Data i want to send."	
    Example 2: Id of input field: serialSend(2, 'textfield') sends the value of textfield.
