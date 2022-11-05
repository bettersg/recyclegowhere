export type Item = {
	"s/n": number;
	name: string;
	category: string;
};

export type SheetyResponse = {
	"itemsList (final)": Item[];
};
