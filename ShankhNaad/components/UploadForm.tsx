import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { MINT_TRACK, SAVE_USER, SUBMIT_TRANSACTION, TRANSFER_NFT } from '../graphql/mutation';
import { Genre } from '../types/body.types';
import pinFileToIPFS from '../pages/api/pinata/pinFiletoIPFS';
import { useRecoilValue, useRecoilState } from 'recoil';
import { LiveUser } from '../atoms/playerAtom';
import { GET_MINTING_NFT_CBOR } from '../graphql/query';
import { useWallet } from '@meshsdk/react';
import { Transaction, ForgeScript } from '@meshsdk/core';
import type { Mint, AssetMetadata } from '@meshsdk/core';

const albumOptions = Object.values(Genre);

const UploadForm: React.FC = () => {
    const [liveUser, setliveUser] = useRecoilState(LiveUser);

    const [SaveTrack] = useMutation(MINT_TRACK, {
        context: {
            headers: {
                'username': liveUser.username,
            }
        }
    });

    
    const [SaveUser] = useMutation(SAVE_USER);
    const [submit] = useMutation(SUBMIT_TRANSACTION);
    const [transferNft] = useMutation(TRANSFER_NFT, {
        context: {
            headers: {
                'seed-phrase': process.env.CARDANO_SPACED_MNEMONIC,
            }
        }
    });
    
    const [imageData, setImageData] = useState("Select an image file!");
    const [imageurl, setImageurl] = useState("");
    const [musicurl, setMusicurl] = useState("");
    const [description, setDescription] = useState("");
    const [imageNft, setImageNft] = useState("");
    const [audioData, setAudioData] = useState("Select an audio file!");
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: '',
        music: '',
        description: '',
        album: [],
        nftIpfsCid: '',
    });
    const { wallet } = useWallet();
    
    const [filesSelected, setFilesSelected] = useState(false);
    
    const [getCbor] = useLazyQuery(GET_MINTING_NFT_CBOR);

    useEffect(() => {
        if (imageurl && musicurl && formData.title && formData.subtitle && formData.description) {
            setFilesSelected(true);
        } else {
            setFilesSelected(false);
        }
    }, [musicurl, imageurl, formData.title, formData.subtitle, formData.description]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        if (!file) {
            alert('Please select an image to upload.');
            return;
        }
        setImageData("Uploading ...");
        pinFileToIPFS(file)
            .then((ipfsHash) => {
                if (ipfsHash) {
                    formData.nftIpfsCid = ipfsHash;
                    const url = `${process.env.GATEWAY}/ipfs/${ipfsHash}`;
                    console.log('File uploaded successfully. URL:', url);
                    setImageurl(url);
                    setImageNft(`${ipfsHash}`);
                    setImageData(event.target.value.replace(/.*(\/|\\)/, '') || "Select an image file!")
                } else {
                    console.log('File upload failed.');
                }
            })
            .catch((error) => console.error('Error:', error));

    };

    const handleMusicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        if (!file) {
            alert('Please select an audio to upload.');
            return;
        }
        setAudioData("Uploading ...");
        try {
            const ipfsHash = await pinFileToIPFS(file);
            if (ipfsHash) {
                const url = `${process.env.GATEWAY}/ipfs/${ipfsHash}`;
                console.log('File uploaded successfully. URL:', url);
                setMusicurl(url);
                setAudioData(event.target.value.replace(/.*(\/|\\)/, '') || "Select an audio file!");
            } else {
                console.log('File upload failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const updatedAlbums = [...formData.album];

        if (updatedAlbums.includes(value)) {
            const index = updatedAlbums.indexOf(value);
            updatedAlbums.splice(index, 1);
        } else {
            updatedAlbums.push(value);
        }

        setFormData({
            ...formData,
            album: updatedAlbums.slice(-4),
        });

    };

    const Transact = async (response, data) => {

        const forgingScript = ForgeScript.withOneSignature(liveUser.wallet.address);

        const tx = new Transaction({ initiator: wallet });

        // define asset#1 metadata
        const assetMetadata: AssetMetadata = {
            "name": response.data.trackMintNft.nftAssetName,
            "image": `ipfs://${imageNft}`,
            "mediaType": "image/jpg",
            "description": response.data.trackMintNft.nftDescription
        };
        const asset1: Mint = {
            assetName: 'MeshToken',
            assetQuantity: '1',
            metadata: assetMetadata,
            label: '721',
            recipient: liveUser.wallet.address,
        };
        tx.mintAsset(
            forgingScript,
            asset1,
        );

        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        console.log(await txHash);
        alert(`Asset minted ${txHash}`);

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        SaveTrack({
            variables: {
                track: {
                    title: formData.title,
                    subtitle: formData.subtitle,
                    music: musicurl,
                    image: imageurl,
                    lyrics: formData.description,
                    album: formData.album,
                    likes: 0,
                    n_listens: 0,
                    value: 1,
                    nftIpfsCid: imageNft,
                    nftAssetName: "Dhol Baaje - " + formData.title,
                    nftName: "Dhol Baaje - " + formData.title,
                    nftDescription: "Dhol Baaje Song - " + formData.description,
                    username: liveUser.username,
                }
            }
        }).then((response) => {
            alert('Form submitted successfully!');
            setliveUser({
                ...liveUser,
                myTracksId: liveUser.myTracksId !== null ? [...liveUser.myTracksId, response.data.trackMintNft.id] : [response.data.trackMintNft.id],
            });
            SaveUser({
                variables: {
                    user: {
                        id: liveUser.id,
                        myTracksId: liveUser.myTracksId !== null ? [...liveUser.myTracksId, response.data.trackMintNft.id] : [response.data.trackMintNft.id],
                        likedTracksId: liveUser.likedTracksId,
                        historyTracksId: liveUser.historyTracksId,
                        createdAt: liveUser.createdAt,
                        updatedAt: liveUser.updatedAt,
                    }
                }
            }).then((data) => {
                Transact(response, data);
            });
            // Transact(response);
            formData.music = '';
            formData.title = '';
            formData.subtitle = '';
            formData.description = '';
            formData.image = '';
            formData.album = [];
            formData.nftIpfsCid = '';
            setAudioData("Select an audio file!");
            setImageData("Select an image file!");
        })
    }

    return (

        <section className="w-screen mb-32 sm:mb-20 md:w-[calc(100vw-120px)] ml-2 sm:ml-24 py-4 space-y-8 md:mr-2.5 md:max-w-[79rem] lg:w-4/5">
            {
                <form encType="multipart/form-data" onSubmit={handleSubmit} className="w-full p-4 bg-black rounded-md shadow-lg">
                    <div className="sm:flex sm:space-x-8">
                        <div className="sm:w-7/12">
                            <h2 className="text-xl font-bold mb-4 text-green-500">Add New Track</h2>
                            <div className="mb-4 ">
                                <label htmlFor="title" className="block mb-1">Title:</label>
                                <input required type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="bg-black w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="subtitle" className="block mb-1">Subtitle:</label>
                                <input required type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} className="bg-black w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="mb-4 flex items-center">
                                <p>Cover Art:</p>
                                <label className={`border border-gray-300 rounded p-2 m-2 mr-0 ${imageData === "Select an image file!" ? 'transparant' : 'bg-green-500'} hover:bg-green-700 max-w-[80%]`} htmlFor="image">
                                    <input type="file" id="image" name="image" required accept="image/*" onChange={handleImageChange} className="w-full hidden" />

                                    <p className="text-ellipsis max-w-full overflow-hidden">{imageData}</p>
                                </label>
                            </div>
                            <div className="mb-4 flex items-center">
                                <p>Audio file:</p>
                                <label className={`border border-gray-300 rounded p-2 m-2 mr-0 ${audioData === "Select an audio file!" ? 'transparant' : 'bg-green-500'} hover:bg-green-700 max-w-[80%]`} htmlFor="music">
                                    <input type="file" id="music" name="music" required accept="audio/*" onChange={handleMusicChange} className="w-full hidden" />
                                    <p className="text-ellipsis max-w-full overflow-hidden">{audioData}</p>
                                </label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block mb-1">Description:</label>
                                <textarea required id="description" name="description" value={formData.description} onChange={handleChange} className="bg-black w-full p-2 border border-gray-300 rounded" />
                            </div>
                        </div>
                        <div className="w-4/12 md:pl-10">
                            <label className="block mb-1">Albums:</label>
                            {albumOptions.map(album => (
                                <div key={album} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={album}
                                        value={album}
                                        checked={formData.album.includes(album)}
                                        onChange={handleCheckboxChange}
                                        className="mr-2 bg-green-100 border-green-300 text-green-500 focus:ring-green-200"
                                    />
                                    <label htmlFor={album}>{album}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className={`bg-green-500 text-white px-4 py-2 my-4 rounded hover:bg-green-700 ${!filesSelected ? 'pointer-events-none opacity-50' : ''}`} disabled={!filesSelected}>Submit</button>
                </form >
            }
        </section >
    );
};

export default UploadForm;