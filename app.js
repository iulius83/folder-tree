
let originalJSON = [
    {
        "For Home Products": [
        "Menu Free Antivirus",
        "Menu Premium",
        "Menu Internet Security"
        ]
    },
    {
        "For Business Products": [
        {
            "Client/Servers": [
            "Menu Professional Security",
            "Menu Server Security",
            "Menu Business Security Suite",
            "Menu Endpoint Security"
            ]
        },
        {
            "Integration": [
            "Anti-Malware",
            "Antispam SDK (SPACE)",
            "Rebranding &amp;amp; Bundling",
            "Integration Services"
            ]
        },
        "Small Business",
        "Managed Services",
        {
            "Gateways": [
            "Menu MailGate",
            "Menu MailGate Suite",
            "Menu AntiVir Exchange",
            "Menu WebGate",
            "Menu WebGate Suite",
            "Menu GateWay Bundle",
            "Menu SharePoint"
            ]
        },
        "Large Applications"
        ]
    }
];

function iterateThroughObject(object) {
    if (object.length > 0) {
        for (let element in object) {
            let key = Object.keys(object[element]).toString();
            let values = object[element][key];

            createDOMelements(key, 1);

            values.forEach(value => {
            if (typeof(value) === 'object') {
                iterateThroughObject(value);
            } else {
                createDOMelements(value, 2);
            }
            });
        }

    } else {
        let key = Object.keys(object).toString();
        let values = object[key];

        createDOMelements(key, 2);
        
        values.forEach(value => {
            createDOMelements(value, 3);
        });
    }
}

iterateThroughObject(originalJSON);

function createDOMelements(element, nr) {
    let container = document.getElementById("container");
    let title = document.createElement(`h${nr}`);
    let icon = document.createElement('i');
    let titleValue = document.createTextNode(` ${element}`);
    title.setAttribute('class', 'element');

    if (nr < 3) {
        icon.setAttribute("class", "far fa-folder-open fa-xs");
        icon.setAttribute("onclick", "showHide(this)");
    } else {
        icon.setAttribute("class", "far fa-folder fa-xs");
    }

    container.appendChild(title);
    title.appendChild(icon);
    title.appendChild(titleValue);
}

function showHide(clickedItem) {
    let parent = clickedItem.parentElement;
    let parentNumber = clickedItem.parentElement.tagName[1];

    if (!parent.classList.contains('closed') && parent.nextSibling) {
        parent.classList.add('closed');
        
        while (parentNumber < parent.nextSibling.tagName[1]) {
        parent.nextSibling.classList.add('hidden');

        console.log(parent.nextSibling ? true : false);

        if (parent.nextSibling.nextSibling) {
            parent = parent.nextSibling;
        } else {
            break;
        }
        }

    } else if (parent.nextSibling) {
        while (parentNumber < parent.nextSibling.tagName[1]) {
        
        parent.classList.remove('closed');
        parent.nextSibling.classList.remove('hidden');

        console.log(parent.nextSibling ? true : false);

        if (parent.nextSibling.nextSibling) {
            parent = parent.nextSibling;
        } else {
            break;
        }
        }
    }
}
