class books
{
	constructor(title,author,isbn)
	{
		this.title=title;
		this.author=author;
		this.isbn=isbn
	}
}


// STORAGE OF BOOKS
class store 
{
	static getbooks()
	{
		let books
		if(localStorage.getItem('books')===null)
		{
			books=[]
		}
		else
		{
			books=JSON.parse(localStorage.getItem('books'))
		}
		return books;
	}
	
	static removebook(isbn)
	{
		const books=store.getbooks();
		books.forEach((book,index) =>{
			if(book.isbn===isbn)
			{
				books.splice(index,1)
			}
		})
	
		localStorage.setItem('books',JSON.stringify(books))
	}
	static addbook(book)
	{
		const books=store.getbooks();
		books.push(book)
		localStorage.setItem('books',JSON.stringify(books))
	}
}

//this class interacts with the user
class  UI
{
	static displaybooks()
	{
		const storedbooks=store.getbooks();


		const storage=storedbooks;
		storage.forEach((book) => UI.addbooks(book))
	}
	static addbooks(book)
	{
		const books=document.querySelector('#book-list')
		const row=document.createElement('tr')
		row.innerHTML=` <td style="font-size:20px;font-family:serif;">${book.title}</td> 
		<td style="font-size:18px;">${book.author}</td>
		<td>${book.isbn}</td> 
		<td><a href="#" class="btn delete">X</a></td>`
		books.appendChild(row)
	}
	static clearfields()
	{
		document.querySelector('#title').value=''
		document.querySelector('#author').value=''
		document.querySelector('#isbn').value=''
	}
	static showalert(message,className)
	{
		const div=document.createElement('div')
		//div.className='alert'
		div.classList.add(`${className}`);
		div.appendChild(document.createTextNode(message));
		const form=document.querySelector('#book-form');
		const cont=document.querySelector('.container');
		cont.insertBefore(div,form)
		//removing after some time
		setTimeout(() => document.querySelector(`.${className}`).remove(),3000)

	}

	static removebook(e)
	{
		if(e.classList.contains('delete'))
		{
			e.parentElement.parentElement.remove()
		}
	}
}

//event  for display books
document.addEventListener('DOMContentLoaded',UI.displaybooks);
document.querySelector('#book-form').addEventListener('submit',(e) =>
{
	e.preventDefault();
	const title=document.querySelector('#title').value;
	const author=document.querySelector('#author').value;
	const isbn=document.querySelector('#isbn').value;


	if (title===''||author===' '||isbn==='')
	{
	
		UI.showalert('please enter all fields','alert')
	}	
	else
	{
		const book=new books(title,author,isbn)
		UI.addbooks(book)

		store.addbook(book)
		UI.showalert('Book Added Successfully','success')
		UI.clearfields()
	}




})

document.querySelector('#book-list').addEventListener('click',(e) =>{

	
	UI.removebook(e.target)
	store.removebook(e.target.parentElement.previousElementSibling.textContent)
	UI.showalert('Book Removed','success')
})
