import * as bcrypt from 'bcrypt';

export const HashPassword = async (password: string): Promise<string> => {
    const Salt = await bcrypt.genSalt();
    const Hash = await bcrypt.hash(password, Salt);
    return Hash
}

export const ComparePassword = async (password: string, hash: string):Promise<boolean> => {
    const IsMatch = await bcrypt.compare(password, hash);
    return IsMatch
}