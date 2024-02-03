exports.difficultyLevelOptionsViewData = (difficultyLevel) => {
    const title = [
        'Vary Easy',
        'Easy',
        'Medium (Standart 3x3)',
        'Intermediate',
        'Expert',
        'Hardcore'
    ];

    const options = title.map((title, index) => {
        const value = index + 1;

        return {
            title: `${value} - ${title}`,
            value: value,
            selected: Number(difficultyLevel) === value ? 'selected' : '',
        };
    });

    return options;
};