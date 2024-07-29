export function isEmail(email) {
	if(  typeof email !== "string" )	return false;

	return RegExp(/^.+@.+$/u, "u")
		.test(email);
}

export function isPhone(contact){
	if(  typeof contact !== "string" && typeof contact !== "number" ){
		return false;
	}

	contact = contact.toString();	// so that both string and number behave same way
	if( contact.startsWith("+91") ){
		contact = contact.split(" ").pop();	// to get last of the splitted string
	}

	return contact.length === 10 && contact.every( ch => (ch >= "0" && ch <= "9") );
}
