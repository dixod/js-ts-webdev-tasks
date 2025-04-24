const works = [
    {
        title: "Startup Framework",
        description: "Startup is a powerful tool for quick and convenient proto-typing of your projects. It will fit most projects because it contains up-to-date and modern web elements.",
        buttonColor: "#FFFFFF",
        buttonColorTitle: "#1E0E62",
        backgroundColor: "#EBEAED",
        titleColor: "#1E0E62",
        descriptionColor: "#1E0E62",
    },
    {
        title: "Web Generator",
        description: "Startup is a powerful tool for quick and convenient proto-typing of your projects. It will fit most projects because it contains up-to-date and modern web elements.",
        buttonColor: "#25DAC5",
        buttonColorTitle: "#FFFFFF",
        backgroundColor: "#FFFFFF",
        titleColor: "#1E0E62",
        descriptionColor: "rgba(21, 20, 57, 0.4)",
    },
    {
        title: "Slides 4",
        description: "All of these components are made in the same style, and can easily be inegrated into projects, allowing you to create hundreds of solutions for your future projects.",
        buttonColor: "#FFFFFF",
        backgroundColor: "#482BE7",
        buttonColorTitle: "#1E0E62",
        titleColor: "#FFFFFF",
        descriptionColor: "#FFFFFF",
    },
    {
        title: "Postcards",
        description: "All frequently used elements are now in symbols. Use them to create interfaces really fast. Easily change icons, colors and text. Add new symbols to customize your design.",
        buttonColor: "#FFFFFF",
        backgroundImage: "./assets/11edef215947a87760019ac83d936f3ef08727bd.jpg",
        buttonColorTitle: "#1E0E62",
        titleColor: "#FFFFFF",
        descriptionColor: "#FFFFFF",
    },
]



const app = document.querySelector(".app");
works.forEach((work) => {
    const title = document.createElement("p");
    const description = document.createElement("p");
    const button = document.createElement("button");
    const container = document.createElement("div");

    const titleColor = work.titleColor;
    const descriptionColor = work.descriptionColor;
    const buttonColor = work.buttonColor;
    const buttonColorTitle = work.buttonColorTitle;


    title.style.color = titleColor;
    description.style.color = descriptionColor;
    button.style.backgroundColor = buttonColor;
    button.style.color = buttonColorTitle;

    title.innerText = work.title;
    description.innerText = work.description;
    container.style.backgroundColor = work.backgroundColor;
    container.style.backgroundImage = `url(${work.backgroundImage})`;
    container.style.backgroundSize = "cover";

    container.style.height = "340px";
    container.style.width = "570px";

    description.style.padding = "0 93px 20px 69px";
    description.style.borderRadius = "10px";

    title.style.padding = "55px 0 16px 71px";
    title.style.fontSize = "22px";
    title.style.fontWeight = "500";

    

    button.innerText = "Explore";

    container.style.padding = "10px";


    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(button);
    app.appendChild(container);

});