"use strict";
// NavEvents.js

class NavEvents
{
  // Initializes an object instance with the provided values.
  constructor(contentFrame)
  {
    // Create the class properties.
    this.ContentFrame = contentFrame;
    this.PrevNavItem = null;
  }

  // Adds the HTML event handlers.
  AddEvents()
  {
    // Event Handlers.
    window.addEventListener("resize", this.WindowResize.bind(this))
    document.addEventListener("click", this.DocumentClick.bind(this));
    menuIco.addEventListener("click", this.MenuClick.bind(this));
    content.addEventListener("mouseenter", this.ContentMouseEnter.bind(this));

    // Create the class element properties.
    this.menubar = document.getElementById("menubar");
    this.menuIco = document.getElementById("menuIco");
    this.sidebar = document.getElementById("sidebar");
    this.content = document.getElementById("content");

    // Set defaults.
    this.menubar.style.display = "none";
    this.menuIco.style.display = "none";
    this.reducedWidth = false;
    this.WindowResize();
  }

  // Set to reduced with if below minimum width.
  WindowResize()
  {
    // Webpage width with scrollbars
    let width = window.innerWidth;

    let minimum = 800;
    if (width < minimum)
    {
      this.reducedWidth = true;

      // Show the menu icon.
      this.menubar.style.display = "block";
      this.menuIco.style.display = "block";

      // Hide the sidebar
      this.sidebar.style.display = "none";
      // ToDo: use widest string width?
      this.sidebar.style.width = "240px";
      this.content.style.width = "100%";
    }
    else
    {
      this.reducedWidth = false;

      // Hide the menu icon.
      this.menubar.style.display = "none";
      this.menuIco.style.display = "none";

      // Show the sidebar
      this.sidebar.style.display = "inline-block";
      this.sidebar.style.position = "relative";
      // ToDo: use widest string width?
      this.sidebar.style.width = "25%";
      this.content.style.width = "75%";
    }
  }

  // Click on the menu icon.
  MenuClick()
  {
    if (this.sidebar.style.display == "none")
    {
      // Show the sidebar.
      this.sidebar.style.display = "inline-block";
      this.sidebar.style.position = "absolute";
    }
    else
    {
      // Hide the sidebar.
      this.sidebar.style.display = "none";
    }
  }

  // Hide the sidebar if at a reduced width.
  ContentMouseEnter()
  {
    if (this.reducedWidth == true)
    {
      this.sidebar.style.display = "none";
    }
  }

  // Document "click" handler method.
  // event - The Source Element event.
  DocumentClick(event)
  {
    let srcElement = event.target;

    // Only perform sidebar action for these class selectors.
    if ("navLiveGroup" == srcElement.className
      || "navItem" == srcElement.className)
    {
      // Get the data-href value.
      let href = srcElement.dataset.href;
      if (href)
      {
        if (this.ContentFrame != null)
        {
          this.ContentMouseEnter();
          this.ContentFrame.src = href;
        }
      }

      if (this.PrevNavItem != null)
      {
        // Resets to original value.
        this.PrevNavItem.style.backgroundColor = "";
      }
      this.PrevNavItem = srcElement;

      let highlight = "#d4dfff";
      srcElement.style.backgroundColor = highlight;
    }
  }
}