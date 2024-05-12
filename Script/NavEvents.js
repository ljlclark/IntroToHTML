"use strict";
// CSSNavEvents.js

class CSSNavEvents
{
  // Initializes an object instance with the provided values.
  constructor(contentFrame)
  {
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

    this.menubar = document.getElementById("menubar");
    this.menuIco = document.getElementById("menuIco");
    this.sidebar = document.getElementById("sidebar");
    this.content = document.getElementById("content");
    this.menubar.style.display = "none";
    this.menuIco.style.display = "none";
    this.reducedWidth = false;
    this.WindowResize();
  }

  // 
  WindowResize()
  {
    let width = window.innerWidth;  // Webpage with scrollbars
    if (width < 800)
    {
      this.reducedWidth = true;
      this.menubar.style.display = "block";
      this.menuIco.style.display = "block";
      this.sidebar.style.display = "none";
      this.sidebar.style.width = "240px";  // use widest string width?
      this.content.style.width = "100%";
    }
    else
    {
      this.reducedWidth = false;
      this.menubar.style.display = "none";
      this.menuIco.style.display = "none";
      this.sidebar.style.display = "inline-block";
      this.sidebar.style.position = "relative";
      this.sidebar.style.width = "25%";  // use widest string width?
      this.content.style.width = "75%";
    }
  }

  // 
  MenuClick()
  {
    if (this.sidebar.style.display == "none")
    {
      this.sidebar.style.display = "inline-block";
      this.sidebar.style.position = "absolute";
    }
    else
    {
      this.sidebar.style.display = "none";
    }
  }

  // 
  ContentMouseEnter()
  {
    if (this.reducedWidth == true)
    {
      this.sidebar.style.display = "none";
    }
  }

  // Document "click" handler method.
  // event - The Target event.
  DocumentClick(event)
  {
    let srcElement = event.target;
    if ("navLiveGroup" == srcElement.className
      || "navItem" == srcElement.className)
    {
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
        this.PrevNavItem.style.backgroundColor = "";
      }
      this.PrevNavItem = srcElement;
      srcElement.style.backgroundColor = "#d4dfff";
    }
  }
}