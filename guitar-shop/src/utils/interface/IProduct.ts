export interface ProductModalProps {
    active: boolean;
    setActive: (value: boolean) => void;
    product: {
        productName: string;
        photo: string;
        comments: string[];
        string: string;
    };
}
