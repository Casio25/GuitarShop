export interface ProductModalProps {
    active: boolean;
    setActive: (value: boolean) => void;
    product: {
        guitarName: string;
        photo: string;
        comments: string[];
    };
}
