
import React, { useState, useEffect } from 'react'; //Importacion
import html2canvas from 'html2canvas';
import '../Estilos/imgmeme.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ReactPaginate from "react-paginate";
import '../Estilos/paginado.css';


const Imgmeme = () => {
    const [imgUrl, setImgUrl] = useState('noimage.jpg')
    const [textomeme, setTextomeme] = useState(); //Declaracion
    const [textomeme2, setTextomeme2] = useState();
    const [imgmeme, setImgmeme] = useState([]);
    const [postexto, setPostexto] = useState();
    const [postexto2, setPostexto2] = useState();
    const [colortexto, setColortexto] = useState();
    const [colortexto2, setColortexto2] = useState();
    // const URL = 'https://api.giphy.com/v1/gifs/search?api_key=lcARf3DUumW4zCV0gfVPZtfefKeqdztz&q=meme&limit=25&offset=0&rating=pg-13&lang=es';
    const URL = 'https://api.imgflip.com/get_memes';

    // GIPHY
    // useEffect(() => {
    //     fetch(URL)
    //         .then(data => data.json())
    //         .then(json => setImgmeme(json.data))
    // }
    // );



    // IMGFILM
    useEffect(() => {
        fetch(URL)
            .then(data => data.json())
            .then(json => setImgmeme(json.data.memes))
    }

    );

    const selectImg = (e) => {
        setImgUrl(e.target.src);
        console.log(e.target.src);
    }

    const textmeme = (e) => {
        setTextomeme(e.target.value);
        console.log(e.target.value);
    }

    const textmeme2 = (e) => {
        setTextomeme2(e.target.value);
        console.log(e.target.value);
    }

    const colortext = (e) => {
        setColortexto(e.target.value);
        console.log(e.target.value);
    }

    const colortext2 = (e) => {
        setColortexto2(e.target.value);
        console.log(e.target.value);
    }

    const selectPostext = (e) => {
        setPostexto(e.target.value);
        let pos = e.target.value;
        console.log(pos);
    }
    const selectPostext2 = (e) => {
        setPostexto2(e.target.value);
        let pos = e.target.value;
        console.log(pos);
    }


    const descarga = (e) => {
        html2canvas(document.getElementById("exportar"), { useCORS: true }).then(function (canvas) {
            // document.body.appendChild(canvas);
            let img = canvas.toDataURL();
            let link = document.createElement("a");
            link.download = "memepropio.jpg";
            link.href = img;
            link.click();
        });
    }


    //paginado con react-paginate
    const [paginaActual, setPaginaActual] = useState(0);
    const itemsPP = 4;
    const nroPaginas = Math.ceil(imgmeme.length / itemsPP);

    const manejarCambioDePagina = (seleccion) => {
        setPaginaActual(seleccion.selected);
    };

    const ultimoMeme = (paginaActual + 1) * itemsPP;
    const primerMeme = ultimoMeme - itemsPP;
    const memesActuales = imgmeme.slice(primerMeme, ultimoMeme);

    return (
        <div>
            <h1>Creá tu propio meme</h1>
            <h4>Escribí tu frase y descargalo</h4>
            <div className="d-flex  align-items-center flex-column col-12">
                {/* GIPHY */}
                {/* <Container >
                    <Row xs={1} sm={2} lg={3} className="g-2 mx-0 px-0">
                        {imgmeme.map((img) => (
                            <Col key={img.id}>
                                <Card className='cardMeme'>
                                    <Card.Img onClick={selectImg} variant="top" src={img.images.fixed_height.url} className='card-img' />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>  */}

                {/* IMGFILM */}

                <div className='m-auto'>
                    <p>Selecciona una imagen para tu meme</p>
                </div>
                <Container >
                    <Row xs={1} sm={2} lg={2} xl={4} className="g-3 mx-0 px-0">
                        {memesActuales.map((img) => (
                            <Col key={img.id}>
                                <Card className='cardMeme'>
                                    <Card.Img onClick={selectImg} variant="top" src={img.url} className='card-img' />
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <div className="paginate-container">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Sig. >"
                            onPageChange={manejarCambioDePagina}
                            pageRangeDisplayed={itemsPP}
                            pageCount={nroPaginas}
                            previousLabel="< Ant."
                            renderOnZeroPageCount={null}
                        />
                    </div>


                </Container>

                <form className='d-flex col-md-8 m-1 '>


                    <select onChange={selectPostext} className="form-select m-1" aria-label="Default select example">
                        <option selected>Posición del texto</option>
                        <option value={'up'}>Arriba</option>
                        <option value={'mid'}>Centro</option>
                        <option value={'down'}>Abajo</option>

                    </select>
                    <input onChange={textmeme} className='form-control m-1 ' type='text' placeholder='Escribí tu frase y selecciona un color' />
                    <input onChange={colortext} type='color' name='Color de texto' className='colorInput' />

                </form>
                <form className='d-flex col-md-8 m-1 '>
                    <select onChange={selectPostext2} className="form-select m-1" aria-label="Default select example">
                        <option selected>Posición del texto</option>
                        <option value={'up'}>Arriba</option>
                        <option value={'mid'}>Centro</option>
                        <option value={'down'}>Abajo</option>

                    </select>
                    <input onChange={textmeme2} className='form-control m-1 ' type='text' placeholder='Escribí tu frase y selecciona un color' />
                    <input onChange={colortext2} type='color' name='Color de texto' className='colorInput' />
                </form>
            </div>



            <figure className='text-center  memeBox' id='exportar'>

                <img src={imgUrl} alt="meme" />

                <p className={`texto-meme ${postexto}`} style={{ "color": `${colortexto}` }} >{textomeme}</p>
                <p className={`texto-meme ${postexto2}`} style={{ "color": `${colortexto2}` }} >{textomeme2}</p>

            </figure>

            <button className='down-btn btn btn-light' onClick={descarga}>Descargar</button>

        </div>
    )
}

export default Imgmeme;
