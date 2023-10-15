import axios from 'axios';

interface PinataApiResponse {
  IpfsHash: string;
}

const pinFileToIPFS = async (file: File): Promise<string | null> => {
  const JWT = process.env.PINATA_JWT;
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post<PinataApiResponse>('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'Authorization': `Bearer ${JWT}`
      }
    });

    console.log('File pinned successfully to IPFS. IPFS CID:', response.data.IpfsHash);
    console.log('Access the file at:', response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error pinning file to IPFS:', error.response ? error.response.data : error.message);
    return null;
  }
};

export default pinFileToIPFS;