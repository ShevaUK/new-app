import {List,Button, Input, Checkbox, Table} from 'antd';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useEffect,useState} from "react";






const columns = [
    {
        title: 'Назва',
        dataIndex: 'title',
        key: 'name',
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'age',
    },
    {
        title: 'Опис',
        dataIndex: 'description',
        key: 'address',
    },
];
const removeBook=(bookId)=>fetch(`https://web-production-b461.up.railway.app/guest/tutorials/${bookId}`,{
    method: "DELETE", // or 'PUT'
    headers: {
        "Content-Type": "application/json",
    }
    });
const addBook=(title,description)=>fetch('https://web-production-b461.up.railway.app/guest/tutorials',{
    method: "POST", // or 'PUT'
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({title: title, description:description, published: false}),

})


const updateBook=(title,description,bookId)=>fetch(`https://web-production-b461.up.railway.app/guest/tutorials/${bookId}`,{
    method: "PUT", // or 'PUT'
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({title: title,
        description:description,
        published: false}),

})
const filtrPublished=(published)=>fetch(`https://web-production-b461.up.railway.app/guest/tutorials${!published ? "" : "/published" }`,{
    method: "GET", // or 'PUT'
    headers: {
        "Content-Type": "application/json",
    }
}).then(res =>
    res.json()
);

function Table1() {

    const [bookId,setBookId]=useState("");
    const [title,setTitle]=useState("Hello");
    const [description,setDescription]=useState("Hi");
    const queryClient = useQueryClient()
    const bookGet = useQuery('repoData', () =>
        fetch('https://web-production-b461.up.railway.app/guest/tutorials').then(res =>
            res.json()
        )
    );
    const [showPublishedOnly, setShowPublishedOnly] = useState(false);
    const bookPublishedGet = useQuery(['repoData1',showPublishedOnly], () => filtrPublished(showPublishedOnly)

    );
    const handleShowPublishedChange = (e) => {
        setShowPublishedOnly(e.target.checked);
    };





    const bookUpdate = useMutation( () =>updateBook(title,description,bookId), {
        onSuccess: () => {
            // Invalidate and refetch
            bookGet.refetch()
            setTitle("")
            setDescription("")
            setBookId("")
        },
        onError: (e) => {
            console.log("e")
            console.log(e)
        },
    })
    console.log("FFFFFFFFFFFF");
    console.log(bookPublishedGet.data);

    const bookAdd = useMutation( () =>addBook(title,description), {
        onSuccess: () => {
            // Invalidate and refetch
            bookGet.refetch()
            setTitle("")
            setDescription("")
        },

    })
    const bookRemove = useMutation( () =>removeBook(bookId), {
        onSuccess: () => {
            // Invalidate and refetch
            bookGet.refetch()
            setBookId("")
        },
    })

    if (bookPublishedGet.isLoading) return 'Loading...'
    return (
        <div className="App">

            {/*<Checkbox */}
            {/*    onChange={(a)=>console.log(a.target.checked)}>Checkbox*/}

            {/*</Checkbox>*/}

            <Input placeholder="Введіть назву книги"  value={title} onChange={(v)=>setTitle(v.target.value)}/>
            <Input placeholder="Введіть опис книги"  value={description} onChange={(v)=>setDescription(v.target.value)}/>
            <Input placeholder="Введіть ID книги"  value={bookId} onChange={(v)=>setBookId(v.target.value)}/>
            <Button type="primary"
                onClick={() =>
                    bookAdd.mutate()
                }
            >
                Add book
            </Button>
            <Button type="primary"
                    onClick={() =>
                        bookUpdate.mutate()
                    }
            >Update книгу зі списку
            </Button>
            <Button type="primary"
                    onClick={() =>
                        bookRemove.mutate()
                    }
            >Видалити книгу зі списку
            </Button>
            <Checkbox checked={showPublishedOnly} onChange={handleShowPublishedChange}>
                Тільки опубліковані
            </Checkbox>
            <Table dataSource={bookPublishedGet?.data?.tutorials} columns={columns} />


        </div>
    );
}


export default Table1;
